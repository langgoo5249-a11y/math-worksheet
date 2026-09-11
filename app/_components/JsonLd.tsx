/**
 * JsonLd —— 统一的 JSON-LD 结构化数据注入组件（Server Component）
 *
 * 用途：P4-A 为 resources / knowledge / grade / parent-guide / textbook 五大栏目
 * 补 Article / CollectionPage + BreadcrumbList 标记。
 *
 * 统一由此组件渲染，避免各页面重复写 dangerouslySetInnerHTML，
 * 也保证 <script type="application/ld+json"> 的写法一致。
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
