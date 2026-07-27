'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '功能建议',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 模拟提交（实际项目中应该发送到后端API）
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 打开邮件客户端
    const subject = encodeURIComponent(`【${formData.type}】${formData.name} - 来自网站留言`);
    const body = encodeURIComponent(
      `姓名：${formData.name}\n邮箱：${formData.email}\n类型：${formData.type}\n\n留言内容：\n${formData.message}`
    );
    window.location.href = `mailto:lang@example.com?subject=${subject}&body=${body}`;
    
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-white font-medium mb-2">感谢您的留言！</p>
        <p className="text-gray-400 text-sm">邮件客户端已打开，请发送邮件完成提交。</p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', type: '功能建议', message: '' });
          }}
          className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
        >
          继续留言
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-400 text-sm mb-1">您的称呼 *</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          placeholder="请输入您的称呼"
        />
      </div>
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">联系邮箱 *</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
          placeholder="请输入您的邮箱"
        />
      </div>
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">留言类型</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
        >
          <option value="功能建议">💡 功能建议</option>
          <option value="Bug反馈">🐛 Bug 反馈</option>
          <option value="链接问题">🔗 链接问题</option>
          <option value="商务合作">🤝 商务合作</option>
          <option value="版权问题">©️ 版权问题</option>
          <option value="其他问题">❓ 其他问题</option>
        </select>
      </div>
      
      <div>
        <label className="block text-gray-400 text-sm mb-1">留言内容 *</label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2 bg-slate-700/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
          placeholder="请详细描述您的问题或建议..."
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-medium rounded-lg transition-colors text-sm"
      >
        {loading ? '提交中...' : '提交留言'}
      </button>
      
      <p className="text-gray-500 text-xs text-center">
        提交后将打开邮件客户端发送留言
      </p>
    </form>
  );
}
