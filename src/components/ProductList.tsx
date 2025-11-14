import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {useState, useEffect} from "react";
import type {ProductType} from '@/api/products.ts';
import {getProducts, deleteProduct} from '@/api/products.ts';
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {Pencil, Trash} from "lucide-react";

const ProductList = () => {

const [products, setProducts] = useState <ProductType[]> ([])

const [loading, setLoading] = useState<boolean>(true);

 // για να αποφύγουμε το διπλό delete και να μην μπορεί να ξαναπατηθεί το κουμπί μέχρι να διαγραφεί το id.
const [deleteWaiting, setDeleteWaiting] = useState<number | null>(null);

const navigate = useNavigate();


    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .finally(() => setLoading(false));
    }, [])


    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            setDeleteWaiting(id)
        }

        // η διαδικασία για να διαγραφτεί το προϊόν και από το frontend
        // πρέπει να είναι try catch και finally, να προσπαθήσει να τρέξει τη διαδικασία αν βγάλει error να μας ενημερώσει και τέλος να αλλάξει το state

        try {
            await deleteProduct(id);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            console.log("Product deleted successfully.");

        }
        catch (error) {
            console.log(error);
        }
        finally {
            setDeleteWaiting(null);
        }
    }

    if (loading) return <div className="text-center p-8">Loading...</div>;



    return (
        <>
<div className="p-8">
            <Table>
                <TableCaption>A list of your products.</TableCaption>
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price} €</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button variant="outline" onClick={()=> navigate(`/products/${item.id}`)}><Pencil/></Button>
                                <Button variant="destructive"
                                        onClick={()=> handleDelete(item.id)}
                                        disabled={deleteWaiting === item.id}
                                >
                                    <Trash/>
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
</div>
        </>
    )
}

export default ProductList;