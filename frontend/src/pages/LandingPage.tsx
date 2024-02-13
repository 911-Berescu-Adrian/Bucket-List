import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
            <h1 className="text-[4rem] font-bold mt-[10rem]">Plan your dream vacation.</h1>
            <div className="mt-4 flex flex-row justify-center [&>*>*]:bg-indigo-600 [&>*>*]:rounded-lg [&>*>*]:w-32 [&>*>*]:h-12 [&>*]:font-bold [&>*]:m-16 [&>*>*]:text-xl [&>*>*]:items-center ">
                <Link to="/login">
                    <button className="hover:drop-shadow-[0px_0px_40px_rgba(159,134,217,0.9)] transition duration-150 ease-out hover:shadow-[-16px_16px_0px_rgba(0,0,0,0.25)]    hover:bg-indigo-800  text-primary font-bold  ">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="hover:drop-shadow-[0px_0px_40px_rgba(159,134,217,0.9)] transition duration-150 ease-out hover:shadow-[-16px_16px_0px_rgba(0,0,0,0.25)]    hover:bg-indigo-800 text-primary font-bold">
                        Register
                    </button>
                </Link>
            </div>
        </>
    );
}
