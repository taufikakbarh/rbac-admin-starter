"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Stop rebuilding role-based access control from scratch
        </h1>

        <p className="mt-4 text-muted-foreground text-lg">
          A production-ready admin starter with users, roles, permissions,
          and live role preview — built for real apps.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/login">Try Live Demo</Link>
          </Button>

          <Button variant="outline" size="lg">
            Get the Code
          </Button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        
        <div>
          <h3 className="font-semibold text-lg">
            Built-in RBAC System
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Skip weeks of building permissions logic from scratch.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Live Role Preview 🔥
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Instantly see how different roles affect your UI in real time.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Ready for Real Projects
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Clean structure, scalable, and easy to extend.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">
            Save Hours of Work
          </h3>
          <p className="text-sm text-muted-foreground mt-2">
            Focus on your product instead of rebuilding admin systems.
          </p>
        </div>

      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 border-t">
        <h2 className="text-xl font-semibold text-center">
          What you get
        </h2>

        <ul className="mt-6 space-y-2 text-sm text-muted-foreground max-w-md mx-auto">
          <li>✔ Full source code</li>
          <li>✔ User & role management</li>
          <li>✔ Permission system (RBAC)</li>
          <li>✔ Role preview feature</li>
          <li>✔ Clean and scalable structure</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="max-w-5xl text-center py-20 border-t mx-auto">
        <h2 className="text-2xl font-semibold">
          Start building your admin panel today
        </h2>

        <p className="text-muted-foreground mt-2">
          Skip the boring setup and focus on your product.
        </p>

        <div className="mt-6">
          <a href="https://tophwork.gumroad.com/l/zcnrue" target="_blank">
            Get the Template
          </a>
        </div>
      </section>

    </div>
  )
}