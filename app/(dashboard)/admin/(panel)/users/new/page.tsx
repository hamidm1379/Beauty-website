import UserForm from "@/app/features/admin/components/users/UserForm";

export default function NewUserPage() {
  return (
    <div className="space-y-8">
      <UserForm mode="create" />
    </div>
  );
}