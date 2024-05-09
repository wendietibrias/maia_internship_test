import useAlert,{ useAlertType } from "../../hooks/alert.hook";

const Alert = () => {
    const { message } = useAlert() as useAlertType;

    return (
        <div className="w-full bg-bgAlert border border-[#FBDFDF] mb-5 py-2 px-3 rounded-md">
            <h5 className="text-sm font-medium">{message}</h5>
        </div>
    )
}

export default Alert;