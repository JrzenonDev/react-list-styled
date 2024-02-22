import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";
import * as Dialog from "@radix-ui/react-dialog";

const createFormSchema = z.object({
  name: z.string().min(3, { message: "Minimum of 3 characters" }),
  slug: z.string(),
});

type CreateTagFormProps = z.infer<typeof createFormSchema>;

function getSlugToString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s]/g, "") // Remove symbols
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .trim(); // Trim leading and trailing spaces
}

export const CreateTagForm = () => {
  const { register, handleSubmit, watch } = useForm<CreateTagFormProps>({
    resolver: zodResolver(createFormSchema),
  });

  const handleCreateTag = (data: CreateTagFormProps) => {
    console.log(data);
  };

  const slug = getSlugToString(watch("name"));

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
          value={slug}
          readOnly
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button type="button">
            <X className="size-3" />
            Cancel
          </Button>
        </Dialog.Close>
        <Button className="bg-teal-400 text-teal-950" type="submit">
          <Check className="size-3" />
          Save
        </Button>
      </div>
    </form>
  );
};
