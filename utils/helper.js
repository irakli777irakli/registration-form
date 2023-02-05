const geo = ["ა","ბ","გ","დ","ე","ვ",
"ზ","თ","ი","კ","ლ",
"მ","ნ","ო","პ","ჟ","რ",
"ს","ტ","უ","ფ","ქ","ღ","ყ",
"შ","ჩ","ც","ძ","წ",
"ჭ","ხ","ჯ","ჰ"
]



export function georgianCheck(value){
    for(let i=0;i<value?.length;i++){
        if(!geo.includes(value[i])){
            return false;
        }
    }
    if(value?.length >= 2){
        return true;
    }
    return false;
    
}
