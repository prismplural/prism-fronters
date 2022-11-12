import twemoji from 'twemoji';
import toHtml from 'discord-markdown';

const { toHTML } = toHtml;

// Converts discord markdown into HTML, and parses twemojis
export function convertToHTML(str: string): string {
    if (str) return twemoji.parse(toHTML(str, { embed: true }));
    return "";
}