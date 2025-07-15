import FormBkbKeluar from "@/app/ui/direktur/form_bkb_keluar";
import { InputTbl } from "@/app/component/input_tbl";
export default function page() {
    return(
        <FormBkbKeluar>
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
        </FormBkbKeluar>
    );
}