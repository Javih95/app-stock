'use client'
import { useSearchParams, usePathname,useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce";
export function Search() {
    const searchParams= useSearchParams()
    const pathName= usePathname()
    const {replace} = useRouter();
    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(term)
        const params = new URLSearchParams(searchParams)
        if(term){
        params.set('query',term)
        }else{
            params.delete('query')
        }
        replace(`${pathName}?${params.toString()}`)
    },300)
    return (
        <input type="text" onChange={(event) => handleSearch(event.target.value)} className="form-control w-25" placeholder="Buscar..." defaultValue={searchParams.get(`query`)?.toString()}/>
    )
}