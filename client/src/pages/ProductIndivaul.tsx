import {
  PanelLeft,
  Search,
  ShoppingCart,
  BadgeDollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet ,SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {   useParams } from "react-router-dom"
import { useEffect, useReducer, useState } from "react"
import { Products, Variants } from "@/types/database"
import axios from "axios"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import Swal from 'sweetalert2';



export default function ProductIndivaul() {
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    const [reducer, forceUpdate] = useReducer(x => x + 1, 0)
    const { id } = useParams();
    const [data , setData] = useState<Products | null>([])
    const [variants , setVariants] = useState<Variants>([])

    const [purchase , setPurchase] = useState({
        variant_id:"",
        stock_to_add:"",
    })

    const [sales , setSales] = useState({
        variant_id:"",
        remove_stocks:"",
    })

    useEffect(() => {
        FetchProduct()
    },[BASE_URL,reducer])


    const FetchProduct = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/products/${id}/`)
            setData(response.data)
            console.log(response.data.variants);
            setVariants(response.data.variants)
        }catch(error){
            console.log(error);
        }
        
    }


    const handleChangePurchase = (e) => {
        const { name, value } = e.target;
        setPurchase(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeSales = (e) => {
        const { name, value } = e.target;
        setSales(prevState => ({
            ...prevState,
            [name]: value
        }));
    };




    const hanldePurchaseStock = async (variantId : string) => {
        
        if(!purchase.stock_to_add.trim()){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
                
              });
              
              Toast.fire({
                icon: 'error',
                title: "Must have Stocks",
              });
              return false
        }

        setPurchase(prevState => ({
            ...prevState,
            variant_id: variantId
        }));
 
        try{
            const response = await axios.post(`${BASE_URL}/api/purchase/`,purchase)
            if(response.status === 200){
            const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Added Stocks"
          });   
          forceUpdate()
        }
        }catch(error){
            console.log(error);
        }        
    }


    

    const hanldeSaleStock = async (variantId : string) => {
   
        setSales(prevState => ({
            ...prevState,
            variant_id: variantId
        }));

        if(!sales.remove_stocks.trim()){
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                },
                
              });
              
              Toast.fire({
                icon: 'error',
                title: "Must Have Stocks",
              });
              return false
        } 
 
        try{
            const response = await axios.post(`${BASE_URL}/api/sales/`,sales)
            if(response.status === 200){
            const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Remove Stocks"
          });   
          forceUpdate()
        }
        }catch(error){
            console.log(error);
        }        
    }
    


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
     
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            
          </Sheet>
       
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="https://vikncodes.com/images/vikncodes.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          defaultValue={data?.ProductName}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Product Code</Label>
                        <Input
                          id="description"
                          defaultValue={data?.ProductCode}
                        
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

{variants.map((data) => (
            data.name === 'size' ? (
        <Card key={data.id} x-chunk="dashboard-07-chunk-1">
            <CardHeader>
                <CardTitle>Stock of the colour size</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">SKU</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead className="w-[100px]">Size</TableHead>
                            <TableHead className="w-[100px]">Purhase Stock</TableHead>
                            <TableHead className="w-[100px]">Sales Stock</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.sub_variants.map((subVariant, index) => (
                            <TableRow key={subVariant.id}>
                                <TableCell className="font-semibold">
                                    {`GGPC-00${index + 1}`}
                                </TableCell>
                                <TableCell>
                                    <Label htmlFor={`stock-${index + 1}`} className="sr-only">
                                        Stock
                                    </Label>
                                    <Input
                                        id={`stock-${index + 1}`}
                                        type="number"
                                        defaultValue={subVariant.stock}
                                    />
                                </TableCell>
                                <TableCell>
                                    <ToggleGroup
                                        type="single"
                                        defaultValue={subVariant.name.toLowerCase()}
                                        variant="outline"
                                    >
                                        {subVariant.name === 'S' && (
                                            <ToggleGroupItem value="s">S</ToggleGroupItem>
                                            
                                        )}
                                        {subVariant.name === 'M' && (
                                            <ToggleGroupItem value="m">M</ToggleGroupItem>
                                        )}
                                        {subVariant.name === 'L' && (
                                            <ToggleGroupItem value="l">L</ToggleGroupItem>
                                        )}
                                    </ToggleGroup>
                                </TableCell>
                                <TableCell>
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <ShoppingCart className="hover:cursor-pointer"  />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input type="number"
                                        name='stock_to_add'
                                        onChange={handleChangePurchase}
                                        value={purchase.stock_to_add}
                                         placeholder="Enter Number to add Stocks" />
                                        </div>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => hanldePurchaseStock(subVariant.id) } >Purchase</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                                    


                                </TableCell>
                                <TableCell>
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <BadgeDollarSign className="hover:cursor-pointer"  />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input type="number"
                                        name='remove_stocks'
                                        onChange={handleChangeSales}
                                        value={sales.remove_stocks}
                                         placeholder="Enter Number to add Stocks" />
                                        </div>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => hanldeSaleStock(subVariant.id) }>Sales</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    ) : null
))}

        
{variants.map((data) => (
            data.name === "color" ? (

                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Stock of the Size Variants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">SKU</TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead className="w-[100px]"> Name </TableHead>
                          <TableHead className="w-[100px]"> Purchase Stock </TableHead>
                          <TableHead className="w-[100px]"> Sales Stock </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                    {data.sub_variants.map((subVariant, index) =>(

              
                        <TableRow>
                          <TableCell className="font-semibold">
                          {`GGPC-00${index + 1}`}
                          </TableCell>
                          <TableCell>
                            <Label htmlFor={`stock-${index + 1}`} className="sr-only">
                              Stock
                            </Label>
                            <Input
                            id={`stock-${index + 1}`}
                            type="number"
                            defaultValue={subVariant.stock}
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="name">{subVariant.name} </ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                          <TableCell className="hover:cursor-pointer" >
                          <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <ShoppingCart className="hover:cursor-pointer" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input type="number"
                                        name='stock_to_add'
                                        onChange={handleChangePurchase}
                                        value={purchase.stock_to_add}
                                         placeholder="Enter Number to add Stocks" />
                            </div>
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => hanldePurchaseStock(subVariant.id) } >Purchase</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                                </TableCell>
                                <TableCell>
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <BadgeDollarSign className="hover:cursor-pointer"  />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                    <div className="flex w-full max-w-sm items-center space-x-2">
                                        <Input type="number"
                                        name='remove_stocks'
                                        onChange={handleChangeSales}
                                        value={sales.remove_stocks}
                                         placeholder="Enter Number to add Stocks" />
                                        </div>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction  onClick={() => hanldeSaleStock(subVariant.id) } >Sales</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>                           
                           
                            </TableCell>
                        </TableRow>
          ))}

                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

) : null
))}


                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Product Varaint</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-3">
                      <div className="grid gap-3">
                        <Label htmlFor="category">variants</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Products category" />
                          </SelectTrigger>
                          <SelectContent>
                        {variants.map((data , index) => (
                        <SelectItem value="clothing"> {data.name} </SelectItem>
                        ))}
                      
                            
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card
                  className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                >
                  <CardHeader>
                    <CardTitle>Product Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                    {data?.ProductImage ? (
                        <img
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="300"
                          src={`${BASE_URL}${data.ProductImage}`}
                          width="300"
                        />
                    ):null}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
