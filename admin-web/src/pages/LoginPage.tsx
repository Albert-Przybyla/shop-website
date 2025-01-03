import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { LoginModel, LoginSchema } from "@/schemas/LoginSchema";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";
import { login as loginRequest } from "@/api/login";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const router = useNavigate();
  const { login, user } = useUserContext();
  const { toast } = useToast();

  const form = useForm<LoginModel>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const onSubmit = async (values: LoginModel) => {
    const res = await loginRequest(values);
    if (res.success) {
      login(res.token!);
      toast({
        title: "Success",
        description: "Login successful",
      });
      router("/app/home");
    } else {
      toast({
        title: "Error",
        description: "Login failed",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Card className="w-[500px] max-w-[90vw]">
        <CardHeader>
          <CardTitle>Zalgouj się</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit">Zaloguj się</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
