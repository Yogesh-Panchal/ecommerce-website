import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";


function CommonForm({ formcontrols , formData,setFormData ,onSubmit ,buttonText }) {

    function renderInputsByComponentType(getControlItem) {
        let element = null;
        const value = formData[getControlItem.name] || ''

        switch (getControlItem.componentType) {
            case 'input':
        
                element = <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange = {event=> setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value,
                    })}
                />
                break;

            case 'select':
                element = <Select onValueChange={(value) =>setFormData({
                    ...formData,
                    [getControlItem.name] :value
                })}
                value={value}>
                    <SelectTrigger className="W-full">
                        <SelectValue placeholder={getControlItem.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options &&
                            getControlItem.options.length > 0 ?
                            //getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{options.label}</SelectItem>) : null
                            getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label} </SelectItem>) :null
                        }
                    </SelectContent>
                </Select>
                break;

            case 'textarea':
                element = <Textarea
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.id}
                    value={value}
                    onChange = {event=> setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value,
                    })}
                />
                break;


            default:
                element = <Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange = {event=> setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value,
                    })}
                />
                break;
        }
        return element
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {
                    formcontrols.map(controlItem =>
                        <div className="grid- w-full gap-1.5" key={controlItem.name}>
                            <Label className="mb-1">{controlItem.label}</Label>
                            {
                                renderInputsByComponentType(controlItem)
                            }
                        </div>
                    )
                }
            </div>
            <button type='submit' className="mt-2 w-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md h-9">{buttonText || 'Submit'}</button>
        </form>
    );
}

export default CommonForm;