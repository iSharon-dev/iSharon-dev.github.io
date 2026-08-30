"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`);
    window.location.href = `mailto:2998236578@qq.com?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>NAME<input name="name" required placeholder="你的姓名" /></label>
      <label>EMAIL<input name="email" required type="email" placeholder="your@email.com" /></label>
      <label>MESSAGE<textarea name="message" required rows={5} placeholder="聊聊项目、实习或合作机会……" /></label>
      <button type="submit">SEND MESSAGE ↗</button>
      {status === "success" && <p className="form-status">邮件客户端已打开，谢谢你的联系。</p>}
    </form>
  );
}
