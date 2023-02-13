const geo = ["ა","ბ","გ","დ","ე","ვ",
"ზ","თ","ი","კ","ლ",
"მ","ნ","ო","პ","ჟ","რ",
"ს","ტ","უ","ფ","ქ","ღ","ყ",
"შ","ჩ","ც","ძ","წ",
"ჭ","ხ","ჯ","ჰ",
]



export function georgianCheck(value){
    
    const textLength =  value?.length;
    for(let i=0;i<textLength;i++){
        // ირაკლი ლომი
        if(!geo.includes(value[i])){
            return false;
        }
    }
    
   console.log(value)
    if(textLength >= 2){
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
            // shifting arr items like this is not good for `time & space` complexity
            arrWithoutDashes.splice(4,0," ")
            for(let i=8;i<=14;i+=3){
                arrWithoutDashes.splice(i,0," ")
            }
            
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


const possibleRoutes = ["/","/generalNews/1","/experience/2","/education/3","/result"];
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


export function getFormatedNumber(number){
    return number.split(" ").join("")

}

export const gInfo = {
    name: ["",false,false],
    surname: ["",false,false],
    photo: ["",false,false],
    aboutMe: [""],
    email: ["",false,false],
    phoneNumber: ["",false,false],
  }

export const eXperience = {
    id: 0,
    position: ["",false,false],
    employer: ["",false,false],
    job_start_date: ["",false,false],
    job_end_date: ["",false,false],
    description: ["",false,false]
}
export const eDucation = {
    id: 0,
      school: ["",false,false],
      degree: ["",false,false],
      school_end_date: ["",false,false],
      ed_desc: ["",false,false]
}



export function makeExpDefault(emptyExp){
    const defaulltedOne = emptyExp.map((el)=> {
    return {
    id: 0,
    position: ["",false,false],
    employer: ["",false,false],
    job_start_date: ["",false,false],
    job_end_date: ["",false,false],
    description: ["",false,false]
        }
    });
    return defaulltedOne;
}
export function makeEduDefault(emptyEdu){
    const defaultOne = emptyEdu.map((el) => {
        const {id,school,degree,school_end_date,ed_desc} = el;
        return {
            id: 0,
            school: ["",false,false],
            degree:["",false,false,degree[3]],
            school_end_date: ["",false,false],
            ed_desc: ["",false,false]
        }
    });

    return defaultOne
}


    
    
