import { FaUserCircle } from "react-icons/fa";
import useSWR from "swr";
import AsyncData from "./asyncData/AsyncData";
import { getById } from "../api";

export default function UserLabel () {
    const {
        data: user,
        isLoading,
        error,
    } = useSWR(`/werknemers/${1}`, getById)

    return (
        <div className="border border-[#E5E5E5] py-3 flex gap-5 items-center w-60 justify-center rounded-3xl m-4">
            <FaUserCircle className="text-4xl text-[#C4C4C4]"/>
            <div>
                <AsyncData loading={isLoading} error={error}>
                    {user && (
                        <>
                            <p className="font-bold">{user.firstName} {user.lastName}</p>
                            <p className="text-[#4D4D4D]">{user.jobTitel}</p>
                        </>
                    )}
                </AsyncData>
            </div>
        </div>
    )
}