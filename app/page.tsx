"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CsvUploader from "@/components/FileUpload";
import Products from "@/components/Product";

const FileUploader = ({
  setOpen,
  open,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload CSV</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload a CSV File</DialogTitle>
          <DialogDescription>
            Choose a CSV file and upload it to the server.
          </DialogDescription>
        </DialogHeader>

        <CsvUploader />

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <main className="p-10 space-y-6">
      <h1 className="text-2xl font-semibold"> Upload CSV Here</h1>

      <FileUploader open={open} setOpen={setOpen} />

      <Products />
    </main>
  );
}
