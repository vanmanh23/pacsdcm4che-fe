import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { SquarePen } from "lucide-react";
import type { User } from "./columns";
import { useForm } from "react-hook-form";

export default function PatientDetailsDialog({ props }: { props: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const onSubmit = (data: User) => {
    console.log(data);
    alert("Message submitted!");
  };
  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white outline-none hover:bg-gray-100">
            <SquarePen />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full md:h-[50%] h-full overflow-y-scroll max-w-2xl rounded-xl bg-white md:p-6 p-2 xl:space-y-3 md:space-y-3 space-y-2 shadow-lg">
          <div className="flex justify-center items-center min-h-fit">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-lg  p-1 w-full "
            >
              <h2 className="text-center text-xl font-semibold mb-3">
                Edit user
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("username", { required: "Name is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", { required: "Name is required" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded outline-bg-secondary"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-row justify-end gap-2 text-center">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <button
                  type="submit"
                  className="bg-bg-secondary hover:bg-bg-secondary/75 text-white font-semibold px-6 rounded-md transition duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
