export interface Category{
  id: string
  name: string
}
export interface Product{
  id: string
  title: string
  price: number
  description: string
  images: string[]
  category: Category
  taxes?: number    //clase de transformacion de peticiones
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
  //esta interfaz la hacemos para que cuando mandemos a crear un producto el producto sea basado en este modelo
  //no usamos la interfaz anterior porque los datos que se envian para crear el producto no siempre son los mismos
  //que se reciben al hacer get, ya que el id por ejemplo lo asigna la api y no nosotros

  categoryId: number

  //lo que hicimos al hacer esta interfaz es heredar de la interfaz anterior omitiendo las cosas que no necesitamos
  //como el id y la categoria, luego agregamos lo que necesitamos que no existe en Product (categoryId)
  //de esta forma esta interface tiene todos los datos de Product, menos id y category y ademas tiene categoryId
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UpdateProductDTO extends Partial<CreateProductDTO>{
 //aqui hacemos no obligatorios los datos de la interfaz con ?
  // title?: string
  // price?: number
  // description?: string
  // images?: string[]
  // categoryId: number

  //pero para reutilzar codigo mejor extendemos de CreateProductDTO que casualmente tiene los mismos datos que necesitamos
  // y con Partial le indicamos que todos son opcionales
}
