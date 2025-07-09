import FormBkkMasuk from "@/app/ui/admin/form_bkk_masuk";
import { InputTbl } from "@/app/component/input_tbl";
export default function page() {
    return(
        <FormBkkMasuk
        >
            <InputTbl>
                Tanggal
            </InputTbl>
            <InputTbl>
                Uraian
            </InputTbl>
            <InputTbl>
                Uang Masuk
            </InputTbl>
            <InputTbl
            classPage="hidden"
            >
                debit
            </InputTbl>
        </FormBkkMasuk>
    );
}