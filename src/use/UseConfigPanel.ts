
import { DialogHelper } from "@/helper/DialogHelper"
import ConfigModal from "@/views/config/index.vue"

export default async function UseConfigPanel(){
    DialogHelper.show(ConfigModal)
}