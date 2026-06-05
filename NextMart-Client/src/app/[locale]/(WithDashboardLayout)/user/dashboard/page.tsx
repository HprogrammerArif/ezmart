import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Heart, History, Store } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Account</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 orders in transit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              4 items on sale
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">
              Equivalent to $12.50
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendor Status</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <Link href="/user/shop/products" className="text-xs text-blue-600 hover:underline">
              Manage your shop
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="border-t pt-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Order #ORD-2023-102</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on Oct 24, 2023
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-medium">$129.00</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Delivered</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Order #ORD-2023-098</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on Sep 12, 2023
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-medium">$45.50</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Shipped</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Order #ORD-2023-085</p>
                  <p className="text-sm text-muted-foreground">
                    Placed on Aug 05, 2023
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-medium">$399.99</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Delivered</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-6">View All Orders</Button>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
          </CardHeader>
          <CardContent className="border-t pt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Name</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="font-medium">john.doe@example.com</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Phone</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Default Address</p>
              <p className="font-medium text-sm mt-1">
                123 Main Street, Apt 4B<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            <Button variant="outline" className="w-full mt-4">Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
