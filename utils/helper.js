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
//13
const numInitial = ["+","9","9","5"];
const postNumbers = ["0","1","2","3","4","5","6","7","8","9"]
let sizeOfTheValue;
let preNumCheck;
let postNumCheck;
export function phoneNumberChecker(value){

    const arrWithoutDashes = value.split('').filter((el)=> el !== " ");
 
    const arrSize = arrWithoutDashes.length;

    if(arrSize <= numInitial.length){
        for(let i=0;i<arrSize;i++){
            if(arrWithoutDashes[i] !== numInitial[i]){
                // console.log("pre incorrect")
                return false;
            }
        }
        preNumCheck = true;
    }else{
        for(let j=numInitial.length;j<13;j++){
            if(arrWithoutDashes[j] === undefined){
                continue
            }else{ 
                if(!postNumbers.includes(arrWithoutDashes[j])){
                    //console.log("post incorrect")
                    return false;
                }
           }
    }
    postNumCheck = true;
        }
        if(preNumCheck && postNumCheck && arrWithoutDashes.length === 13){
            //console.log("executed")
            let finalOutput = arrWithoutDashes.join("");
            
            
            return {
                isValidNumber:true,
                finalOutput
            }
        }
        else{
            return {isValidNumber:false}
        }
       
    }


const possibleRoutes = ["/generalNews/1","/experience/2","/education/3","/result"];
export function urlNavigator(index){
    return possibleRoutes[index];
}





// postNumCheck = true;
    // if(preNumCheck && postNumCheck && sizeOfTheValue?.length === 13){
    //     console.log("return true")
    //     return true;
    // }else{
    //     return false
    // }

//     if(!(value.charCodeAt(i) >= 0 || value.charCodeAt(i) <= 57)){
//         return false;
//    }
    

// if(sizeOfTheValue <= numInitial.length){
//     for(let i=0;i<sizeOfTheValue;i++){
//         if(value[i] !== numInitial[i]){
//             console.log("pre incorrect")
//             return false;
//         }
//     }
//     preNumCheck = true;
    
    
