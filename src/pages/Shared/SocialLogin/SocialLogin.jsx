import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const SocialLogin = () => {
    const { googleSignin } = useContext(AuthContext);

    const handleGoogleSignin = () => {
        googleSignin()
            .then(result => {
                console.log(result);
            })
            .catch(error => console.error(error));
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handleGoogleSignin} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;