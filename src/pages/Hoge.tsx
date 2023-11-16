import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

interface Item {
  name: string;
}

type Inputs = {
  userName: string;
  age: string;
  items: Item[];
};

const variationSchema = z
  .object({
    userName: z.boolean(),
    age: z.boolean(),
    items: z.array(z.custom<Item>()),
  })
  .refine((data) => data.userName === data.age, {
    path: ["age"],
    message: "名前と年齢が一致しません",
  });

export default function CountrySelect() {
  const { register, control, handleSubmit } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(variationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <Stack spacing={2}>
      <Box>
        <TextField label="名前" {...register("userName")} />
      </Box>
      <Box>
        <TextField label="年齢" {...register("age")} />
      </Box>
      <Box>
        {fields.map((field, index) => (
          <Stack key={field.id} direction="row" spacing={2}>
            <Box>
              <TextField
                label="名前"
                {...register(`items.${index}.name` as const)}
              />
            </Box>
            <Box>
              <Button onClick={() => remove(index)}>削除</Button>
            </Box>
          </Stack>
        ))}
      </Box>
      <Box>
        <Button onClick={() => append({ name: "" })}>追加</Button>
      </Box>
      <Box>
        <Button onClick={handleSubmit(onSubmit)}>送信</Button>
      </Box>
    </Stack>
  );
}
