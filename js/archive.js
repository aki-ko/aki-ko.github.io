// Reserved for future archive search/filter expansion.
export function archiveKey(item){return [item.year,item.category,...(item.tags||[])].filter(Boolean).join(' ').toLowerCase();}
