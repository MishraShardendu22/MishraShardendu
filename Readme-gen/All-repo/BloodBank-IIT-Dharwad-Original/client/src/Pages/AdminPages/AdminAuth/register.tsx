import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Droplets, ArrowRight, User, Mail, Phone, LockKeyhole, Check, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Layout from "../_Layout"
import axiosInstance from "../../../util/axiosInstance"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const RegisterAdmin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNo: "",
    adminPassword: "",
    marketingAccept: false,
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.passwordConfirmation) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await axiosInstance.post("/admin/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phoneNo: formData.phoneNo,
        adminPassword: formData.adminPassword,
      })

      if (response.status === 201) {
        navigate("/admin/login")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Registration failed")
      } else {
        setError("An error occurred. Please try again.")
      }
    }
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Blood Donation"
            src="/blood-donor-register.jpg"
            className="absolute inset-0 object-cover w-full h-full opacity-90"
          />
          
          <div className="relative hidden h-full lg:block lg:p-12">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Droplets className="h-8 text-white sm:h-10" />
              <Badge variant="secondary" className="text-sm">
                Blood Donor Registration
              </Badge>
            </motion.div>

            <motion.h2
              className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Become a Hero Today! 🩸
            </motion.h2>

            <motion.p
              className="mt-4 leading-relaxed text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Join our community of life-savers. By registering as a blood donor, 
              you're taking the first step towards making a real difference in someone's life.
            </motion.p>
          </div>
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <Card className="w-full max-w-2xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-primary" />
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="mb-2">
                    Donor Registration
                  </Badge>
                  <CardTitle className="text-2xl">Register as Blood Admin</CardTitle>
                </div>
              </div>
              <CardDescription>
                Create your admin account to start your journey of saving lives through blood donation
              </CardDescription>
            </CardHeader>
              <CardContent>
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="FirstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="FirstName"
                          name="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="LastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="LastName"
                          name="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="Email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="Email"
                        name="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="PhoneNo">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="PhoneNo"
                        name="phoneNo"
                        type="tel"
                        placeholder="+91 000-0000-000"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="Password">Password</Label>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="Password"
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="PasswordConfirmation">Confirm Password</Label>
                      <div className="relative">
                        <Check className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="PasswordConfirmation"
                          name="passwordConfirmation"
                          type="password"
                          placeholder="••••••••"
                          value={formData.passwordConfirmation}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="Password">Admin Password</Label>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="adminPassword"
                          name="adminPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.adminPassword}
                          onChange={handleChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="MarketingAccept"
                      name="marketingAccept"
                      checked={formData.marketingAccept}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, marketingAccept: checked as boolean }))
                      }
                    />
                    <Label htmlFor="MarketingAccept" className="text-sm text-gray-600">
                      I want to receive emails about blood donation announcements
                    </Label>
                  </div>

                  <div className="text-sm text-gray-600">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      terms and conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      privacy policy
                    </a>
                    .
                  </div>

                  {error && (
                    <div className="p-3 text-sm text-red-500 rounded-md bg-red-50">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Create account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link to="/admin/login" className="text-primary hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </motion.form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export default RegisterAdmin;