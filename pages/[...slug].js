import Navbar from "@/components/Navbar";
import PagesMainWrapper from "@/components/PagesWrapper/PagesMainWrapper";
import { useRouter } from "next/router";

const engToGeo = {
  "generalNews": "პირადი ინფო",
  "experience": "გამოცდილება",
  "education":"განათლება"
}


function GenericValidationForm() {
    const router = useRouter();
    const urlInfo = router.query.slug;
    console.log(urlInfo);
    return (
      <PagesMainWrapper>
    {urlInfo && <Navbar currentPage={urlInfo} title={engToGeo[urlInfo[0]]}/>}
    </PagesMainWrapper>
  )
}

export default GenericValidationForm;