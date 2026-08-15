import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { Input } from "@/components/ui/Input";
import { AlertCircle } from "lucide-react";
import { TextArea } from "@/components/ui/TextArea";

export default function TestDesignSystem() {
  return (
    <div className="p-40 space-y-24">
      <div className="space-y-6">
        <h1 className="flex px-3 py-2 font-mono text-xs leading-none bg-ink text-paper w-fit">
          Buttons
        </h1>

        <div className="flex flex-wrap items-center gap-6">
          <Button>Primary</Button>
          {/* or <Button variant="primary">Primary</Button> */}

          <Button variant="secondary">Secondary</Button>

          <Button variant="danger">Danger</Button>

          <Button variant="ghost-danger">Gost Danger</Button>

          <Button size="sm">Small</Button>
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="flex px-3 py-2 font-mono text-xs leading-none bg-ink text-paper w-fit">
          Main Labels
        </h1>

        <div className="flex flex-wrap items-center gap-6">
          <Label>Todo</Label>
          {/* or <Label variant="todo">Todo</Label> */}

          <Label variant="in-progress">In progress</Label>

          <Label variant="in-review">In review</Label>

          <Label variant="done">Done</Label>
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="flex px-3 py-2 font-mono text-xs leading-none bg-ink text-paper w-fit">
          Form UI
        </h1>

        <div className="flex flex-wrap items-center gap-6">
          <FieldGroup className={"w-1/2"}>
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input type="text" placeholder="We want to know who you are" />
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" placeholder="Type something here" />
              <FieldDescription>
                Are you sure you want to use this email
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="password" placeholder="Type something secure here" />
              <FieldDescription className="text-danger">
                <AlertCircle className="fill-current size-4 stroke-paper" />
                <span>This password looks suspicious</span>
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel>Message</FieldLabel>
              <TextArea placeholder="Want to leave us a feedback?" />
            </Field>

            <Field orientation="horizontal">
              <Button size="sm" variant="primary">
                Male
              </Button>
              <Button size="sm" variant="secondary">
                Female
              </Button>
            </Field>
            <Field orientation="vertical" className="mt-6">
              <Button variant="secondary">Login</Button>
              <Button variant="primary">Get Started</Button>
            </Field>
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}
