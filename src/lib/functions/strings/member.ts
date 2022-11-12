// These are the default functions for handling Pluralkit strings
// these should work on every system, since it doesn't rely on specific formats for names/etc

// if you want strings to be more personalized, take a look at the README in this folder

import emojiRegex from 'emoji-regex';
import moment from 'moment';

import type { Member, System } from '$lib/types';

const emojiregex = emojiRegex();

// Returns a member's description
export function getDescription(member: Member) {
    return member.description ? member.description : "(No description)";
}

// gets all the emojis from the member (display) name
export function getEmojis(member: Member) {
    let memberName = member.display_name ? member.display_name : member.name;
    let str = "";

    let match = memberName.match(emojiregex);
    if (match) {
        match.forEach(emoji => str += emoji)
    }

    return str;
}

// Parses a member's birthday
export function getBirthday(member: Member) {
    if (member.birthday) {
        let str = moment(member.birthday, "YYYY-MM-DD").format("MMM D, YYYY");

        if (str.endsWith(', 0004')) str = str.replace(', 0004', "");
    
        return str;
    }
    return "";
}

// Parses a member's pronouns, just returns the pronouns by default.
export function getPronouns(member: Member) {
    return member.pronouns ? member.pronouns : "";
}

// Returns the member's avatar
export function getAvatar(member: Member) {
    return member.avatar_url ? member.avatar_url : "";
}

// Returns the member's banner
export function getBanner(member: Member) {
    return member.banner ? member.banner : "";
}

// Gets a member's name
export function getName(member: Member) {
    return member.name;
}

// Gets a member's color, returns emptystring or fallback color
export function getColor(member: Member, fallback = false) {
    if (member.color) return "#" + member.color;
    if (fallback === true) return "#ffffff";
    return "";
}

// Builds the opengraph embed description for the current fronters page
export function buildFrontEmbedDescription(members: Member[]) {
    let str = "";
    if (members && members.length > 0) {
        if (members.length > 4) {
            str = `${members[0].name}, ${members[1].name}, ${members[2].name} and ${members.length - 3} others are currently fronting.`;
        } else if (members.length === 4) {
            str = `${members[0].name}, ${members[1].name}, ${members[2].name} and ${members[3].name} are currently fronting.`;
        } else if (members.length === 3) {
            str = `${members[0].name}, ${members[1].name} and ${members[2].name} are currently fronting.`
        } else if (members.length === 2) {
            str = `${members[0].name} and ${members[1].name} are both fronting.`
        } else if (members.length === 1) {
            str = `${members[0].name} is currently fronting.`
        }
    } else {
        str = buildSwitchOutText();
    }
    return str;
}

// Builds the page title for a member page
export function buildMemberPageTitle(system: System, member: Member) {
    return buildMemberEmbedTitle(system, member)
}

// Builds the opengraph embed title for a member page
export function buildMemberEmbedTitle(system: System, member: Member) {
    let memberName = member.display_name ? member.display_name : member.name;

    let str = memberName;
    if (system.name) {
        str += ` (${system.name})`
    }
    return str.trim();
}

// Creates the opengraph embed body for a member page
export function buildMemberEmbedDescription(member: Member) {
    return `Read some more about ${member.name}!`
}

// Returns the text that shows when switched out
export function buildSwitchOutText() {
    return "Currently switched out!";
}