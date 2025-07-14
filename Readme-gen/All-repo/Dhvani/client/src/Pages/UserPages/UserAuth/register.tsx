import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Droplets, ArrowRight, User, Mail, Phone, LockKeyhole, Check, Heart, Calendar, MapPin, CreditCard, Scale, Ruler } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const RegisterUser = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNo: "",
    height: "",
    weight: "",
    bloodGroup: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    aadharNo: "",
    marketingAccept: false,
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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
      const response = await axiosInstance.post("/user/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phoneNo: formData.phoneNo,
        height: parseInt(formData.height),
        weight: parseInt(formData.weight),
        bloodGroup: formData.bloodGroup,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        address: formData.address,
        aadharNo: formData.aadharNo,
      })

      if (response.status === 201) {
        navigate("/user/login")
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
    <div className="min-h-screen bg-slate-100">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="User Register"
            src="/register-health.png"
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
                User Registration
              </Badge>
            </motion.div>
          </div>
        </aside>

        <main className="flex items-center justify-center px-8 py-8 text-slate-600 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <Card className="w-full max-w-4xl">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-primary" />
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
                <div className="space-y-1">
                  <Badge variant="outline" className="mb-2">
                    User Registration
                  </Badge>
                  <CardTitle className="text-2xl">Register as User</CardTitle>
                </div>
              </div>
              <CardDescription>
                Create your User account to start your journey of saving lives through blood donation
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
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-700">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="FirstName">First Name *</Label>
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
                        <Label htmlFor="LastName">Last Name *</Label>
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

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="Email">Email *</Label>
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
                            placeholder="1234567890"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            className="pl-10"
                            maxLength={10}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="DateOfBirth">Date of Birth *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="DateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Gender">Gender *</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="AadharNo">Aadhar Number *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="AadharNo"
                          name="aadharNo"
                          placeholder="123456789012"
                          value={formData.aadharNo}
                          onChange={handleChange}
                          className="pl-10"
                          maxLength={12}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="Address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Textarea
                          id="Address"
                          name="address"
                          placeholder="Enter your complete address"
                          value={formData.address}
                          onChange={handleChange}
                          className="pl-10 min-h-[80px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-700">Medical Information</h3>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="Height">Height (cm) *</Label>
                        <div className="relative">
                          <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="Height"
                            name="height"
                            type="number"
                            placeholder="175"
                            value={formData.height}
                            onChange={handleChange}
                            className="pl-10"
                            min="40"
                            max="300"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="Weight">Weight (kg) *</Label>
                        <div className="relative">
                          <Scale className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="Weight"
                            name="weight"
                            type="number"
                            placeholder="70"
                            value={formData.weight}
                            onChange={handleChange}
                            className="pl-10"
                            min="1"
                            max="500"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="BloodGroup">Blood Group *</Label>
                        <Select value={formData.bloodGroup} onValueChange={(value) => handleSelectChange("bloodGroup", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-700">Security</h3>
                    
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="Password">Password *</Label>
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
                            minLength={6}
                            maxLength={20}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="PasswordConfirmation">Confirm Password *</Label>
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

                  <div className="flex flex-col space-y-4 text-slate-200 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Create account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link to="/user/login" className="text-primary hover:underline">
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

export default RegisterUser