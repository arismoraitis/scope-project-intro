import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {getProduct, productFormSchema, type ProductFormType, updateProduct, createProduct} from "@/api/products.ts"
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";

type ProductModeProps = {
mode?: "edit" | "create";
}


const Product = ({mode}: ProductModeProps) => {

    //ελέγχουμε εάν υπάρχει productId
const {productId} = useParams<{productId: string}>();
const navigate = useNavigate();

    //Η συνθήκη mode = edit παίρνει μεταβλητή isEdit για να συγκριθεί στο html παρακάτω
    const isEdit = mode === "edit";


    const {
register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, isSubmitting}, //Όταν θέλουμε να κάνουμε μία διαδικασία κατά τη διάρκεια του submit χρησιμοποιούμε το isSubmitting, όπως π.χ να αλλάξει το κείμενο του κουμπιού σε Loading.
    reset,
} = useForm({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            slug: "",
            description: "",
            image: "",
            price: 0,
            sort: 0,
            is_active: false,
            is_favorite: false,
            category_id: 1,
        }
    }
    );


    const onSubmit = async (data: ProductFormType) => {
        try {
            if (isEdit) {
                await updateProduct(Number(productId), data);
                console.log("Product updated successfully.");
            }
            else
                {
                    await createProduct(data);
                    console.log("Product created successfully.");
                }
                navigate("/products");
        }
        catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {

    if (productId) {

        getProduct(Number(productId))
            .then((data)=> {
                //setValue("name", data.name ?? "");

                const values = {
                    name: data.name ?? "",
                    slug: data.slug ?? "",
                    description: data.description ?? "",
                    image: data.image ?? "",
                    price: data.price ?? 0,
                    sort: data.sort ?? 0,
                    is_active: data.is_active ?? false,
                    is_favorite: data.is_favorite ?? false,
                    category_id: data.category_id ?? 1,
                }
                reset(values);
            })
            .catch((err) => {
                console.error(err);
            })
    }
}, [productId,reset])

    return (


        <>
<form
    onSubmit={handleSubmit(onSubmit)}
    className="max-w-xl mx-auto mt-12 p-8 border rounded-lg space-y-6">
<h1 className="text-xl font-bold mb-4">

    {isEdit ? "Edit Product" : "Create New Product"}
</h1>
<div>
    <Label className="mb-2" htmlFor="name">
        Name</Label>
    <Input
       id="name" {...register("name")}
        />
    {errors.name && (
        <div className="text-red-800 text-sm">{errors.name.message}</div>
    )}
</div>

    <div>
        <Label className="mb-2" htmlFor="slug">
            Slug</Label>
        <Input
            id="slug" {...register("slug")}
        />
        {errors.slug && (
            <div className="text-red-800 text-sm">{errors.slug.message}</div>
        )}
    </div>


    <div>
        <Label className="mb-2" htmlFor="description">
            Description</Label>
        <Textarea
            id="description" {...register("description")}
        />
        {errors.description && (
            <div className="text-red-800 text-sm">{errors.description.message}</div>
        )}
    </div>

    <div>
        <Label className="mb-2" htmlFor="image">
            Image</Label>
        <Input
            id="image" {...register("image")}
        />
        {errors.image && (
            <div className="text-red-800 text-sm">{errors.image.message}</div>
        )}
    </div>

    <div>
        <Label className="mb-2" htmlFor="price">
            Price</Label>
        <Input
            id="price" {...register("price")}
        />
        {errors.price && (
            <div className="text-red-800 text-sm">{errors.price.message}</div>
        )}
    </div>

    <div>
        <Label className="mb-2" htmlFor="sort">
            Sort</Label>
        <Input
            id="sort" {...register("sort")}
        />
        {errors.sort && (
            <div className="text-red-800 text-sm">{errors.sort.message}</div>
        )}
    </div>

    <div className="flex items-center space-x-2">
        <Switch id="is_active"
        checked={watch("is_active")}
         onCheckedChange={(v) => setValue("is_active", v)}

        />
        <Label className="mb-2" htmlFor="is_active">Active</Label>
        </div>
    <div className="flex items-center space-x-2">
        <Switch id="is_favorite"
                checked={watch("is_favorite")}
                onCheckedChange={(v) => setValue("is_favorite", v)}
        />
        <Label className="mb-2" htmlFor="is_favorite">Favorite</Label>

    </div>

    {/*Εάν είναι σε διαδικασία Submitting γράψε Submitting... αλλιώς γράψε Submitting*/}
    <Button variant={"default"}
            type="submit"
            className="w-full"
            disabled={isSubmitting}
    >

        {isSubmitting ? "Submitting..." : "Submit"}</Button>

</form>
        </>
    )
}


export default Product;