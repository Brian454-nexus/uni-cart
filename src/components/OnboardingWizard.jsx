import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  User, 
  Store, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Upload, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle
} from 'lucide-react';

const OnboardingWizard = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: '',
    profilePhoto: null,
    phone: '',
    location: '',
    university: '',
    // Buyer specific
    preferences: {
      categories: [],
      priceRange: '',
      brands: []
    },
    // Seller specific
    storeName: '',
    businessCategory: '',
    mpesaNumber: '',
    paystackEmail: '',
    inventoryCapacity: ''
  });

  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 3;

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await completeOnboarding(formData);
      
      // Redirect based on role
      if (formData.role === 'seller') {
        navigate('/seller/dashboard');
      } else {
        navigate('/dashboard');
      }
      
      onClose();
    } catch (error) {
      console.error('Onboarding failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.role !== '';
      case 2:
        return formData.phone && formData.location;
      case 3:
        if (formData.role === 'buyer') {
          return formData.preferences.categories.length > 0 && formData.preferences.priceRange;
        } else {
          return formData.storeName && formData.businessCategory && formData.mpesaNumber;
        }
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Role</h3>
        <p className="text-gray-600">How do you plan to use UniCart?</p>
      </div>

      <RadioGroup
        value={formData.role}
        onValueChange={(value) => handleInputChange('role', value)}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="buyer" id="buyer" />
          <Label htmlFor="buyer" className="flex items-center space-x-3 cursor-pointer flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Buyer</div>
              <div className="text-sm text-gray-500">I want to buy items from other students</div>
            </div>
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
          <RadioGroupItem value="seller" id="seller" />
          <Label htmlFor="seller" className="flex items-center space-x-3 cursor-pointer flex-1">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Seller</div>
              <div className="text-sm text-gray-500">I want to sell items to other students</div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
              {formData.profilePhoto ? (
                <img
                  src={URL.createObjectURL(formData.profilePhoto)}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="profile-photo"
              />
              <label
                htmlFor="profile-photo"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+254 712 345 678"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Nairobi, Kenya"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            University
          </label>
          <Input
            type="text"
            value={formData.university}
            onChange={(e) => handleInputChange('university', e.target.value)}
            placeholder="University of Nairobi"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (formData.role === 'buyer') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Shopping Preferences</h3>
            <p className="text-gray-600">Help us show you relevant items</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Electronics', 'Books', 'Clothing', 'Sports', 'Furniture', 'Beauty'].map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.preferences.categories.includes(category)}
                      onChange={(e) => {
                        const categories = e.target.checked
                          ? [...formData.preferences.categories, category]
                          : formData.preferences.categories.filter(c => c !== category);
                        handleInputChange('preferences.categories', categories);
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <Select
                value={formData.preferences.priceRange}
                onValueChange={(value) => handleInputChange('preferences.priceRange', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1000">Under KES 1,000</SelectItem>
                  <SelectItem value="1000-5000">KES 1,000 - 5,000</SelectItem>
                  <SelectItem value="5000-10000">KES 5,000 - 10,000</SelectItem>
                  <SelectItem value="10000+">Over KES 10,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Information</h3>
            <p className="text-gray-600">Set up your seller profile</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store/Brand Name
              </label>
              <Input
                type="text"
                value={formData.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                placeholder="Your store name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Category
              </label>
              <Select
                value={formData.businessCategory}
                onValueChange={(value) => handleInputChange('businessCategory', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="beauty">Beauty</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                M-Pesa Number
              </label>
              <Input
                type="tel"
                value={formData.mpesaNumber}
                onChange={(e) => handleInputChange('mpesaNumber', e.target.value)}
                placeholder="254712345678"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Paystack Email (Optional)
              </label>
              <Input
                type="email"
                value={formData.paystackEmail}
                onChange={(e) => handleInputChange('paystackEmail', e.target.value)}
                placeholder="your.email@example.com"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Inventory Capacity
              </label>
              <Select
                value={formData.inventoryCapacity}
                onValueChange={(value) => handleInputChange('inventoryCapacity', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select capacity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10 items</SelectItem>
                  <SelectItem value="11-50">11-50 items</SelectItem>
                  <SelectItem value="51-100">51-100 items</SelectItem>
                  <SelectItem value="100+">100+ items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
          </div>

          {/* Step Content */}
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                {loading ? 'Completing...' : 'Complete Setup'}
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWizard; 