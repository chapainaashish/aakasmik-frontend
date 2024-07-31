import z from "zod";

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "fields.name.error" })
    .max(100, { message: "fields.name.error" }),

  number: z.string().refine(
    (input) => {
      const inputRegex = /^\d{5,10}$/;
      return inputRegex.test(input);
    },
    {
      message: "fields.number.error",
    }
  ),
  category: z.string().min(1, { message: "fields.category.error" }),

  province: z.string().min(1, { message: "fields.province.error" }),

  district: z.string().min(1, { message: "fields.district.error" }),

  city: z
    .string()
    .min(2, { message: "fields.city.error" })
    .max(20, { message: "fields.city.error" }),
});

export default schema;
