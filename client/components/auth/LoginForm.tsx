"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold text-gray-800">
            Student Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div>
              <Label htmlFor="studentId" className="text-gray-700">
                Enter Student ID
              </Label>
              <Input
                id="studentId"
                type="text"
                placeholder="e.g. STU12345"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700">
                Enter Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="button"
              className="w-full bg-[#736bff] hover:bg-[#5f55ff] text-white"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
