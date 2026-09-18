import { useQuery } from "@tanstack/react-query"

const VendorList = () => {
    const { data } = useQuery({
        queryKey: ["vendors"],
        
    })
}