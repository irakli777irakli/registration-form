import { useRouter } from "next/router";


function GenericValidationForm() {
    const router = useRouter();
    const urlInfo = router.query.slug;
    return (
    <h1>hello </h1>
  )
}

export default GenericValidationForm;