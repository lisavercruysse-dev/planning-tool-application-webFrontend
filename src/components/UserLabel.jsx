import { FaUserCircle } from "react-icons/fa";
import { USER_DATA } from "../api/mock_data";

export default function UserLabel () {
    const user = USER_DATA[1];

    return (
        <div className="border border-[#E5E5E5] py-3 flex gap-5 items-center w-60 justify-center rounded-3xl m-4">
            <FaUserCircle className="text-4xl text-[#C4C4C4]"/>
            <div>
                <p className="font-bold">{user.firstName} {user.lastName}</p>
                <p className="text-[#4D4D4D]">{user.jobtitel}</p>
            </div>
        </div>
    )
}