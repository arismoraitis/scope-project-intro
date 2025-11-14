import {z} from 'zod';

const API_URL = import.meta.env.VITE_API_URL;
const TENANT_ID = import.meta.env.VITE_TENANT_ID;

export const productSchema = z.object({
    // coerce για να διασφαλίσουμε ότι θα διαβάσει το id ακόμη και αν είναι μέσα σε "".
    id: z.coerce.number().int(),
    name: z.string().min(1, "Required"),
    slug: z
        .string()
        .min(1, "Required")
        .regex(/^[a-zA-Z0-9_\-]+$/, "Slug must use only latin letters and numbers, - or _"),
    description: z.string().optional(),
    image: z
        .union([
            z.url({ error: "Must be a valid URL" }),
            z.literal(""),
        ])
        .optional(),
    price: z.coerce.number().nonnegative("Must be greater than 0"),
    sort: z.coerce.number().int().min(0, "Must be greater than 0"),
    is_active: z.boolean(),
    is_favorite: z.boolean(),
    category_id: z.coerce.number().int().min(1,"Category is Required")
});

export type ProductType = z.infer<typeof productSchema>;

export const productFormSchema = productSchema.omit({ id: true });
export type ProductFormType = z.infer<typeof productFormSchema>;

// export type Product = {
//     id: number;
//     name: string,
//     slug: string,
//     description?: string | undefined,
//     image?: string | undefined,
//     price: number,
//     is_active: boolean,
//     is_favorite: boolean,
//     sort: number,
//     category_id?: number | undefined,
// }

export type UpdateProductValues = {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    price: number;
    is_active: boolean;
    is_favorite: boolean;
    sort: number;
}

export type CreateProductValues =  UpdateProductValues;



// θέλουμε να πάρουμε array of objects γι'αυτό βάζουμε array στο Product type στο Promise
export async function getProducts (): Promise<ProductType[]> {
    const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/`, {})
    if (!res.ok) throw new Error ("Failed to load products.");
    const data = await res.json();
    console.log(data);
    return data;
}

// θέλουμε να πάρουμε ένα προϊόν άρα ένα object και όχι το array με όλα τα objects, οπότε δεν βάζουμε array.
export async function getProduct (id: number): Promise<ProductType> {
    const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/${id}`, {})
    if (!res.ok) throw new Error ("Failed to load product" + id);
    const data = await res.json();
    console.log(data);
    return data;
}

// Εγώ στέλνω CreateProductValues  και το API μου επιστρέφει ProductType
export async function createProduct (data: CreateProductValues): Promise<ProductType> {
    const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/`, {

    method: 'POST',
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(data),

});
    if (!res.ok) throw new Error ("Failed to create product");
    return await res.json();
}

// Για να κάνουμε update πρέπει να χρησιμοποιήσουμε PUT η οποία στο Documentation περιμένει ένα body (data) με όλα τα στοιχεία του Product.
export async function updateProduct (id: number, data: UpdateProductValues): Promise<ProductType> {
const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/${id}`, {
    method: 'PUT',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
});

if (!res.ok) throw new Error ("Failed to update product" + id);
return res.json();

}

// void γιατί δεν θέλουμε να επιστρέφει κανένα αποτέλεσμα.
// διαδικασία για να σβηστεί από τη βάση το product που επιλέγει ο χρήστης με βάση το id (${id}.
export async function deleteProduct (id: number): Promise<void> {
    const res = await fetch(`${API_URL}/tenants/${TENANT_ID}/products/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error ("Failed to delete product.");
    }