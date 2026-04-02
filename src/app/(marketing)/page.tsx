"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          RBAC Admin Starter Kit
        </h1>

        <p className="mt-4 text-muted-foreground text-lg">
          Save hours building role-based admin panels.
          Manage users, roles, and permissions out of the box.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <Link href="/login">Live Demo</Link>
          </Button>

          <Button variant="outline">
            Get Template
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        
        <div>
          <h3 className="font-semibold text-lg">
            User Management
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Create, edit, and manage users with ease.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Role & Permissions
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Define exactly what each role can access.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Role Preview 🔥
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Instantly simulate how different roles affect the UI.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Clean & Extendable
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Built with scalable structure for real projects.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-20 border-t">
        <h2 className="text-2xl font-semibold">
          Start building your admin panel today
        </h2>

        <p className="text-muted-foreground mt-2">
          Skip the boring setup and focus on your product.
        </p>

        <div className="mt-6">
          <Button size="lg">
            Get the Template
          </Button>
        </div>
      </section>

    </div>
  )
}