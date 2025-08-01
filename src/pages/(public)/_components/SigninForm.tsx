import { Button } from "../../../components/ui/button";
import { SignIn } from "../../../apis/authApis";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignInProps = {
  username: string;
  password: string;
};

export default function SigninForm() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInProps>();

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    try {
      const res = await SignIn(data);
      localStorage.setItem("token", res.token);
      if (res.token) {
        navigate("/admin/studies");
      }
      // const role = await verifyToken(res.access_tocken);
      // if (role.role === "admin") {
      //   window.location.href = "/admin";
      // } else {
      //   window.location.reload();
      // }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <div className="flex flex-col border border-slate-100 p-5 rounded-md gap-3 py-5">
      <div className="flex flex-col justify-center items-center">
        <img
          src="/src/assets/logo_img.png"
          alt="logo"
          className="w-1/3 h-1/3"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl font-semibold py-3">Login to your account</h3>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5"
        >
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-secondary uppercase">UserName</label>
            <input
              className="rounded-sm p-2 border border-slate-100 outline-bg-secondary"
              {...register("username", {
                required: "username is required",
                maxLength: 20,
              })}
            />
            {errors.username && (
              <p role="alert" className="text-red-500">
                username is required
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-secondary uppercase">Password</label>
            <input
              type="password"
              className="rounded-sm p-2 border border-slate-100 outline-bg-secondary"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p role="alert" className="text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="bg-bg-secondary w-full font-semibold text-white hover:bg-bg-secondary/70 mt-2"
          >
            Login now
          </Button>
        </form>
      </div>
    </div>
  );
}
