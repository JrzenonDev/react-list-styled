import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";

const createFormSchema = z.object({
  name: z.string().min(3, { message: "Minimum of 3 characters" }),
  slug: z.string(),
});

type CreateTagFormProps = z.infer<typeof createFormSchema>;

export const CreateTagForm = () => {
  const { register, handleSubmit } = useForm<CreateTagFormProps>({
    resolver: zodResolver(createFormSchema),
  });

  const handleCreateTag = (data: CreateTagFormProps) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag Form
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          {...register("slug")}
          id="slug"
          type="text"
          readOnly
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button">
          <X className="size-3" />
          Cancel
        </Button>
        <Button className="bg-teal-400 text-teal-950" type="submit">
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  );
};
