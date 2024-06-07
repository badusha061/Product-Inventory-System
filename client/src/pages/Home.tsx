import {
  Eye,
  PanelLeft,
  PlusCircle,
  Search,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Products } from "@/types/database"
import axios from "axios"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { formatDate } from "@/lib/DateFormat"
import { Link, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { jwtDecode } from "jwt-decode";


const subVariantSchema = z.object({
  name: z.string()
    .min(1, { message: "Sub-variant name must be at least 1 character long" })
    .max(10, { message: "Sub-variant name must be less than 10 characters" }),
  stock: z.number()
    .min(0, { message: "Stock must be a positive number" })
});

const variantSchema = z.object({
  name: z.string()
    .min(1, { message: "Variant name must be at least 1 character long" })
    .max(10, { message: "Variant name must be less than 10 characters" }),
  sub_variants: z.array(subVariantSchema)
});


const formSchema = z.object({
  ProductID: z.string()
  .max(5,{
    message:"Product Id Does not more than 5 characters"
  })
  .min(2,{
    message:"Product Id Must Be more than 2 characters"
  }),
  ProductCode : z.string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,{
    message:"Product Code Must be Character and number"
  }),
  ProductName : z.string()
  .min(2,{
    message:"Product Name must be more than 2 character"
  })
  .max(10,{
    message:"Product Name must be less than 10 characters"
  }),
  ProductImage : z.any(),
  CreatedUser : z.number(),
})






export default function Home() {
    const navigate = useNavigate()
    const [data , setData] = useState<Products>([])
    const [next , setNext] = useState<number | null>(0)
    const [previous , setPrevious] = useState<number | null>(0)
    const [error , setError] = useState()
    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
    
    const [page , setPage] = useState<number>(1)

    const token : string = localStorage.getItem('access');
    const decoded = jwtDecode(token);
    const UserId = decoded.id

    const [size , setSize] = useState({
      name:"",
      stock:""
    })

    const [colour ,setColour] = useState({
      name:"",
      stock:""
    })
    

    const handleSize = (e) => {
      const { name, value } = e.target;
      setSize(prevState => ({
          ...prevState,
          [name]: value
      }));
  };


  const handleColour = (e) => {
    const { name, value } = e.target;
    setColour(prevState => ({
        ...prevState,
        [name]: value
    }));
};


    

    useEffect(() => {
        FetchProduct()
    },[BASE_URL])

    const FetchProduct = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/products/?page=${page}`)
            console.log(response.data.results);
            
            setNext(response.data.next)
            setPrevious(response.data.previous)
            setData(response.data.results)
        }catch(error){
            console.log(error);
        }
        
    }

  



    const handleLogout = () => {
        localStorage.removeItem('access')
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
            title: "Successfully Logout User"
          });
          navigate('/login')
        }

        const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
          CreatedUser: UserId,
          },
          mode: "onTouched"
      })




    
  
      const {isSubmitting} = form.formState

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
          const variants = [
            {
              name: "size",
              sub_variants: [size]
            },
            {
              name: "color",
              sub_variants: [colour]

            }
          ];
          const data = new FormData();
          data.append("ProductID",values.ProductID)
          data.append("CreatedUser",values.CreatedUser.toString())
          data.append("ProductCode",values.ProductCode)
          data.append("ProductName",values.ProductName)
          data.append("variants",JSON.stringify(variants))
          if(values.ProductImage){
            data.append("ProductImage",values.ProductImage[0])
          }

        try{
            const response = await axios.post(`${BASE_URL}/api/create/`,data)
            if(response.status === 201){
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
                title: "Successfully Add Product"
              });
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
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout} >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
                <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Product
                  </span>
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-auto max-h-[90vh] border " >
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                <Form {...form}  >
                        <form encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
                           
                        <FormField
                            control={form.control}
                            name="ProductID"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Products Id</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />


                          <FormField
                            control={form.control}
                            name="ProductCode"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Products Code</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />


                          <FormField
                            control={form.control}
                            name="ProductName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Products Name</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        
                <Tabs defaultValue="account" className="w-[400px]">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="account">Size</TabsTrigger>
                        <TabsTrigger value="password">Colour</TabsTrigger>
                      </TabsList>
                      <TabsContent value="account">
                        <Card>
                          <CardContent className="space-y-2">
                          <div className="space-y-1">
                              <Label htmlFor="name">Size Name</Label>
                              <Input 
                              onChange={handleSize}
                              id="name" 
                              name="name"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="stock">Stocks</Label>
                              <Input 
                              onChange={handleSize}
                              id="stock"  
                              name="stock"
                              />
                            </div>
                            
                          </CardContent>
                      
                        </Card>
                      </TabsContent>
                      <TabsContent value="password">
                        <Card>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                              <Label htmlFor="name">Colour Name</Label>
                              <Input 
                              onChange={handleColour}
                              id="name"
                              name="name"
                              />
                            </div>
                            <div className="space-y-1">
                              <Label htmlFor="username">Stocks</Label>
                              <Input 
                              onChange={handleColour}
                              id="stock" 
                              name="stock"
                              />
                            </div>
                          </CardContent>
                          
                        </Card>
                      </TabsContent>
                    </Tabs>
                   
                        

                            <FormField
                            control={form.control}
                            name="ProductImage"
                            render={({}) => (
                                <FormItem>
                                <FormLabel>Product Image</FormLabel>
                                <FormControl>
                                <Input 
                                {...form.register("ProductImage")}
                                type="file"
                                accept="images/*"
                                multiple
                                 />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button className="w-full" type="submit">
                            {isSubmitting ? 
                              <Button disabled>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Please wait
                              </Button>
                              : "Submit"}
                            </Button>
                        </form>
                        </Form>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-full" >Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        

            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your products and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Product Code
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Product User
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead className="hidden hover:cursor-pointer md:table-cell">
                            Views
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {data.map((data , index) => (

                      <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <img
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={`${data.ProductImage}`}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {data.ProductName}
                        </TableCell>
                    {data.Active === true ? (
                         <TableCell> 
                         <Badge variant="outline">Active</Badge>
                       </TableCell>
                    ):(
                        <TableCell> 
                          <Badge variant="outline">Not Active</Badge>
                        </TableCell>
                    )}
                        <TableCell className="hidden md:table-cell">
                            {data.ProductCode}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                            {data.CreatedUser.username}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {formatDate(data.CreatedDate)}
                        </TableCell>
                    <Link to={`/product/${data.id}`} >
                        <TableCell>
                            <Eye />
                        </TableCell>
                    </Link>
                      </TableRow>

                    ))}

                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <Pagination>
        <PaginationContent>
            {previous !== null ? (
            <PaginationItem>
                <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
            ):null}
            <PaginationItem>
            <PaginationLink href="#"> {page} </PaginationLink>
            </PaginationItem>
            {next !== null ? (
            <PaginationItem>
            <PaginationNext onClick={() => setPage(page + 1)} />
            </PaginationItem>
            ):null}
        </PaginationContent>
        </Pagination>

      </div>
    </div>
  )
}
