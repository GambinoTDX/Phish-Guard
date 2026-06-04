import { useState } from "react";

const ALL_EMAILS = [
  {
    id: 1,
    hard: false,
    sender: "security@paypa1-alerts.com",
    senderName: "PayPal Security",
    subject: "URGENT: Verify your PayPal account",
    preview: "We noticed suspicious activity on your PayPal account...",
    body: "Dear Customer,\n\nWe noticed suspicious activity on your PayPal account. Your account has been temporarily limited.\n\nPlease verify your identity immediately to avoid permanent suspension. Failure to act within 24 hours will result in account closure.\n\nClick the link below to verify:\n Verify My Account Now\n\nThank you for being a PayPal customer.\n\nPayPal Security Team",
    phishing: true,
    explanation: "The sender domain uses a '1' (number one) instead of the letter 'l' in PayPal — a classic typosquatting trick. Legitimate PayPal emails always come from @paypal.com. The urgent language and threat of account closure are pressure tactics.",
    hardReason: "",
    time: "9:41 AM",
    avatar: "PP",
    avatarColor: "#003087",
  },
  {
    id: 2,
    hard: false,
    sender: "noreply@github.com",
    senderName: "GitHub",
    subject: "New Sign-In to GitHub",
    preview: "A new sign-in to your GitHub account was detected from Chrome on Windows.",
    body: "Hi there,\n\nA new sign-in to your GitHub account was detected.\n\nDevice: Chrome on Windows\nLocation: New York, United States\nTime: Today at 9:38 AM\n\nIf this was you, no action is needed. If you don't recognize this sign-in, please secure your account immediately by visiting github.com/settings/security.\n\nThanks,\nThe GitHub Team",
    phishing: false,
    explanation: "Legitimate GitHub security notification. The sender is @github.com (verified domain), the language is calm and informational, and it directs you to github.com/settings/security rather than a suspicious URL.",
    hardReason: "",
    time: "9:38 AM",
    avatar: "GH",
    avatarColor: "#24292f",
  },
  {
    id: 3,
    hard: false,
    sender: "support@amaz0n-security.net",
    senderName: "Amazon Support",
    subject: "Problem with your recent order",
    preview: "Your Amazon order has been placed on hold. Please confirm payment details.",
    body: "Hello Valued Customer,\n\nYour recent Amazon order has been placed on hold due to a billing issue.\n\nOrder #112-8847291-3847561\nStatus: PAYMENT FAILED\n\nTo release your shipment and avoid order cancellation, please confirm your payment details within 12 hours.\n\n Update Payment Information\n\nAmazon Customer Service",
    phishing: true,
    explanation: "The domain 'amaz0n-security.net' is fake — it uses a zero instead of 'o' and .net instead of .com. Amazon's real domain is @amazon.com. Real order issues always appear in your Amazon account dashboard.",
    hardReason: "",
    time: "9:15 AM",
    avatar: "AZ",
    avatarColor: "#FF9900",
  },
  {
    id: 4,
    hard: false,
    sender: "account-security@google.com",
    senderName: "Google",
    subject: "Security Alert",
    preview: "Google detected a sign-in to your account from a new device.",
    body: "Hi,\n\nGoogle detected a sign-in to your Google Account from a new device.\n\nThursday, May 28 - 9:02 AM\nWindows - Chrome - New York, USA\n\nIf this was you, you don't need to do anything. If you don't recognize this activity, check your account at myaccount.google.com.\n\nGoogle Security Team",
    phishing: false,
    explanation: "Legitimate Google security alert. The sender domain is @google.com (official), the tone is calm, and it directs you to myaccount.google.com rather than an external URL.",
    hardReason: "",
    time: "9:02 AM",
    avatar: "G",
    avatarColor: "#4285f4",
  },
  {
    id: 5,
    hard: false,
    sender: "billing@netflix-support.co",
    senderName: "Netflix Billing",
    subject: "Your Netflix subscription payment failed",
    preview: "We were unable to process your payment. Update your billing info to keep access.",
    body: "Dear Netflix Member,\n\nWe were unable to process your most recent payment.\n\nYour subscription will be cancelled in 48 hours unless you update your billing information.\n\nMonthly Plan: $15.49/month\nPayment Status: DECLINED\n\n Update Your Payment Method\n\nPlease act now to avoid losing access to your account.\n\nNetflix Billing Department",
    phishing: true,
    explanation: "Netflix never uses the domain 'netflix-support.co'. All official Netflix emails come from @netflix.com. The .co TLD with a hyphenated brand name is a common spoofing pattern.",
    hardReason: "",
    time: "8:55 AM",
    avatar: "N",
    avatarColor: "#e50914",
  },
  {
    id: 6,
    hard: false,
    sender: "updates@microsoft.com",
    senderName: "Microsoft Account",
    subject: "Your security info was updated",
    preview: "Your account recovery information has been updated.",
    body: "Microsoft account\n\nSecurity info was updated\n\nYour account recovery information has been updated. If you made this change, you can disregard this email.\n\nIf you didn't make this change, you should review your recent account activity and update your security info at account.microsoft.com.\n\nThanks,\nThe Microsoft account team",
    phishing: false,
    explanation: "Legitimate Microsoft account notification. The sender is @microsoft.com (official), the email is calm, and it directs you to account.microsoft.com. It does not ask you to click any links directly.",
    hardReason: "",
    time: "8:30 AM",
    avatar: "MS",
    avatarColor: "#00a4ef",
  },
  {
    id: 7,
    hard: false,
    sender: "it-helpdesk@yourcompany-portal.com",
    senderName: "IT Helpdesk",
    subject: "Action Required: Password Expiring Today",
    preview: "Your corporate network password expires TODAY at midnight. Reset immediately.",
    body: "ATTENTION EMPLOYEE,\n\nYour corporate network password expires TODAY at midnight.\n\nIf you do not reset your password immediately, you will be locked out of all company systems including email, VPN, and Slack.\n\n Reset Password Now (Click Here)\n\nThis is your final notice. IT support will not be able to recover your account after expiration.\n\nIT Security Team",
    phishing: true,
    explanation: "'yourcompany-portal.com' is not a legitimate corporate domain. Real IT systems use your company's actual domain. The all-caps urgency and 'final notice' framing are classic phishing pressure tactics.",
    hardReason: "",
    time: "8:12 AM",
    avatar: "IT",
    avatarColor: "#5f6368",
  },
  {
    id: 8,
    hard: false,
    sender: "no-reply@dropbox.com",
    senderName: "Dropbox",
    subject: "Alex Johnson shared a file with you",
    preview: "Q3_Brand_Assets.zip has been shared with you on Dropbox.",
    body: "Hi there,\n\nAlex Johnson (alex.j@designstudio.com) shared a file with you on Dropbox.\n\nFile: Q3_Brand_Assets.zip\nSize: 234 MB\n\nView File\n\nYou received this because someone shared a Dropbox item with you. If you don't recognize the sender, you can report this email.\n\nDropbox",
    phishing: false,
    explanation: "Legitimate Dropbox file-sharing notification. The sender is @dropbox.com (official domain), the format matches real Dropbox share emails, and the CTA is 'View File' not 'Verify your account'.",
    hardReason: "",
    time: "7:58 AM",
    avatar: "DB",
    avatarColor: "#0061ff",
  },
  {
    id: 9,
    hard: false,
    sender: "alert@chase-secure-login.com",
    senderName: "Chase Bank",
    subject: "Your Chase account has been locked",
    preview: "Unusual activity detected. Your account is temporarily locked for your protection.",
    body: "Dear Chase Customer,\n\nWe have detected unusual activity on your Chase bank account and have temporarily locked it for your protection.\n\nTo restore access, you must verify your identity within 24 hours or your account will be permanently suspended.\n\nAccount ending in: ****4821\nDate flagged: Today\n\n Verify Identity & Unlock Account\n\nFor your security, please do not share this link with anyone.\n\nChase Security Team",
    phishing: true,
    explanation: "Chase Bank never uses domains like 'chase-secure-login.com'. All legitimate Chase emails come from @chase.com. Real banks don't lock accounts via email links.",
    hardReason: "",
    time: "7:45 AM",
    avatar: "CH",
    avatarColor: "#117ACA",
  },
  {
    id: 10,
    hard: false,
    sender: "noreply@linkedin.com",
    senderName: "LinkedIn",
    subject: "You have 3 new connection requests",
    preview: "Sarah Chen and 2 others want to connect with you on LinkedIn.",
    body: "Hi there,\n\nYou have 3 new connection requests waiting for you.\n\nSarah Chen - Product Manager at Figma\nDavid Park - Senior Engineer at Stripe\nMaria Santos - UX Designer at Airbnb\n\nView your pending invitations on LinkedIn and grow your professional network.\n\nThe LinkedIn Team",
    phishing: false,
    explanation: "Legitimate LinkedIn notification. The sender is @linkedin.com (official domain), uses calm non-urgent language, and directs you to linkedin.com. LinkedIn regularly sends these digest emails for pending connection requests.",
    hardReason: "",
    time: "7:30 AM",
    avatar: "LI",
    avatarColor: "#0a66c2",
  },
  {
    id: 11,
    hard: false,
    sender: "support@app1e-id-verify.com",
    senderName: "Apple Support",
    subject: "Your Apple ID has been disabled",
    preview: "Your Apple ID was disabled due to too many failed sign-in attempts.",
    body: "Dear Apple Customer,\n\nYour Apple ID has been disabled due to multiple failed sign-in attempts from an unrecognized device.\n\nTo reactivate your account, you must verify your identity immediately. Your access to iCloud, the App Store, and all Apple services will remain suspended until you complete verification.\n\n Reactivate Apple ID\n\nIf you do not verify within 12 hours, your account may be permanently closed.\n\nApple Support",
    phishing: true,
    explanation: "Apple's official domain is @apple.com. 'app1e-id-verify.com' uses a number '1' instead of the letter 'l', a textbook typosquatting technique. Apple never disables accounts this way.",
    hardReason: "",
    time: "7:10 AM",
    avatar: "AP",
    avatarColor: "#1d1d1f",
  },
  {
    id: 12,
    hard: false,
    sender: "no-reply@notion.so",
    senderName: "Notion",
    subject: "Your workspace is over the free limit",
    preview: "You've reached the block limit on the free plan. Upgrade to continue.",
    body: "Hi there,\n\nYour Notion workspace has reached the block storage limit for the free plan.\n\nYou can continue reading existing content, but you won't be able to create new blocks until you upgrade or remove content.\n\nCurrent plan: Free\nBlocks used: 1,000 / 1,000\n\nUpgrade to Notion Plus to get unlimited blocks, unlimited file uploads, and 30-day version history.\n\nThe Notion Team",
    phishing: false,
    explanation: "Legitimate Notion usage notification. The sender is @notion.so (Notion's real domain), the email describes a real free-plan limitation, and uses calm informational language without threatening account deletion.",
    hardReason: "",
    time: "6:55 AM",
    avatar: "NO",
    avatarColor: "#191919",
  },
  {
    id: 13,
    hard: true,
    sender: "no-reply@accounts.google.com",
    senderName: "Google",
    subject: "Critical security alert",
    preview: "A sign-in attempt was blocked. Review activity to keep your account safe.",
    body: "Hi,\n\nWe blocked a sign-in attempt to your Google Account from an unrecognized device.\n\nThursday, May 28 - 11:04 PM\nLocation: Kharkiv, Ukraine\nDevice: Unknown Android\n\nIf this wasn't you, your password may be compromised. Review your account activity and change your password immediately at:\n\nmyaccount.google.com/notifications\n\nIf this was you, you can dismiss this alert.\n\nGoogle Security Team\ngoogle.com",
    phishing: false,
    explanation: "This is a legitimate Google security alert. The sender domain is @accounts.google.com — a real Google subdomain used for account notifications. The email does not ask you to click a link inside the message; it tells you to go directly to myaccount.google.com. Google regularly sends these when a suspicious sign-in is blocked.",
    hardReason: "Real Google subdomain, no suspicious link, calm tone — feels dangerous but is entirely legitimate.",
    time: "11:06 PM",
    avatar: "G",
    avatarColor: "#4285f4",
  },
  {
    id: 14,
    hard: true,
    sender: "security-noreply@amazon.com",
    senderName: "Amazon",
    subject: "Your Amazon order has been canceled",
    preview: "Order #114-2947162-8830541 was canceled. If you didn't request this, act now.",
    body: "Hello,\n\nYour order has been canceled per your request.\n\nOrder #114-2947162-8830541\nItem: Sony WH-1000XM5 Headphones\nAmount refunded: $349.99 to Visa ending in 4827\n\nIf you did NOT request this cancellation, your account may have been compromised. Sign in immediately to secure your account and re-place your order:\n\n Sign in to Amazon\n\nIf you did request this cancellation, no further action is needed. Your refund will appear within 3-5 business days.\n\nAmazon Customer Service",
    phishing: true,
    explanation: "Despite the sender appearing as @amazon.com, the link ' Sign in to Amazon' in real phishing emails like this points to a lookalike domain, not amazon.com. The fake order number, specific item, and partial card number create false familiarity and panic. Amazon cancellation emails never ask you to 'sign in immediately' via a link — always navigate to amazon.com directly.",
    hardReason: "Sender looks like @amazon.com and contains believable order details with a partial card number — panic-inducing but fake.",
    time: "11:23 PM",
    avatar: "AZ",
    avatarColor: "#FF9900",
  },
  {
    id: 15,
    hard: true,
    sender: "notifications@facebookmail.com",
    senderName: "Facebook",
    subject: "Someone tried to log into your account",
    preview: "We detected a login attempt from a device you don't normally use.",
    body: "Hi,\n\nWe noticed a login attempt to your Facebook account from a device we don't recognize.\n\nDate: Thursday, May 28\nLocation: Lagos, Nigeria\nDevice: Chrome on Windows\n\nIf this was you, you can ignore this message. If this wasn't you, we strongly recommend you secure your account by changing your password.\n\nReview the activity and secure your account here:\n https://www.facebook.com/login/identify?ctx=recover\n\nIf you don't act within 24 hours, your account recovery options may be limited.\n\nThe Facebook Security Team",
    phishing: true,
    explanation: "Tricky: facebookmail.com is actually Facebook's real sending domain for notifications. But this email is still phishing. The tell is the '24-hour deadline' threat — Facebook never uses this. Real Facebook security emails never threaten that recovery options will be 'limited' if you don't act. When in doubt, go directly to facebook.com.",
    hardReason: "facebookmail.com is Facebook's real domain — the only tells are the 24-hour deadline and recovery pressure tactic.",
    time: "10:47 PM",
    avatar: "FB",
    avatarColor: "#1877f2",
  },
  {
    id: 16,
    hard: true,
    sender: "docusign@docusign.net",
    senderName: "DocuSign",
    subject: "Please DocuSign: NDA — Consulting Agreement",
    preview: "James Harrington has sent you a document to review and sign.",
    body: "James Harrington (j.harrington@meridianpartners.com) has sent you a DocuSign document.\n\nDOCUMENT: NDA - Consulting Agreement\nDEADLINE: Sign by Friday, May 30\n\nPlease review and sign the document using the button below. By accessing the document, you agree to DocuSign's consumer disclosure.\n\n REVIEW DOCUMENT\n\nThis message was sent to you by j.harrington@meridianpartners.com via DocuSign.\n\nDocuSign, Inc. | 221 Main Street, Suite 1000 | San Francisco, CA | 94105",
    phishing: true,
    explanation: "The sender domain docusign.net is real — DocuSign does send from that domain. But attackers frequently send malicious documents through DocuSign itself, a technique called 'living off trusted infrastructure'. The actual document link leads outside DocuSign to a credential-harvesting page. Always verify DocuSign requests directly with the supposed sender before opening anything.",
    hardReason: "Real DocuSign domain, realistic formatting — but the document itself is malicious. The infrastructure is entirely legitimate.",
    time: "10:15 PM",
    avatar: "DS",
    avatarColor: "#FFCC00",
  },
  {
    id: 17,
    hard: true,
    sender: "no-reply@dropbox.com",
    senderName: "Dropbox",
    subject: "Jordan Michaels shared Q4 Investor Report with you",
    preview: "You have been invited to view a file on Dropbox.",
    body: "Hi,\n\nJordan Michaels (j.michaels@vc-partnerships.io) has shared a file with you on Dropbox.\n\nFile: Q4 Investor Report.pdf\nSize: 2.4 MB\n\nJordan left a message: \"Hi — here's the deck from our call earlier. Let me know your thoughts by EOD.\"\n\n View File on Dropbox\n\nYou received this email because j.michaels@vc-partnerships.io shared a Dropbox file with you.\nIf you don't know this person, report it.\n\nDropbox",
    phishing: false,
    explanation: "This is a legitimate Dropbox share notification from @dropbox.com. The format perfectly matches real Dropbox share emails and includes the actual sharer address. The link goes to Dropbox's real infrastructure. This is hard because the exact same template is widely abused in phishing — always check the URL before entering credentials.",
    hardReason: "Deliberately mirrors real spear-phishing templates. This one is legitimate — but the pattern is widely abused.",
    time: "9:58 PM",
    avatar: "DB",
    avatarColor: "#0061ff",
  },
  {
    id: 18,
    hard: true,
    sender: "noreply@steampowered.com",
    senderName: "Steam",
    subject: "Your Steam account: trade hold removed",
    preview: "The trade hold on your account has been lifted. You may now trade freely.",
    body: "Hello,\n\nThe 15-day trade hold on your Steam account has been successfully removed after your recent mobile authenticator verification.\n\nYou can now:\n- Trade items without delay\n- Sell items on the Community Market immediately\n- Accept incoming trade offers instantly\n\nYour Steam Wallet balance: $47.32\nActive trade offers: 2 pending\n\nNo action is required. If you have any questions, visit help.steampowered.com.\n\nValve Corporation | Steam",
    phishing: false,
    explanation: "Legitimate Steam notification from @steampowered.com, Steam's real sending domain. The email asks you to click nothing, contains no external links, and simply confirms an account state change. No credentials requested, no urgency, no threats.",
    hardReason: "No link, no ask, correct domain — people over-flag Steam as phishing due to how common Steam scams are.",
    time: "9:34 PM",
    avatar: "ST",
    avatarColor: "#1b2838",
  },
  {
    id: 19,
    hard: true,
    sender: "support@paypal.com",
    senderName: "PayPal",
    subject: "You sent a payment of $319.99 to Coinbase",
    preview: "If you didn't authorize this payment, call us at 1-888-221-1161.",
    body: "Hello,\n\nYou sent a payment of $319.99 USD to Coinbase Global Inc.\n\nTransaction ID: 7GH492810X384920P\nDate: May 28, 2026\nPayment method: PayPal Balance\n\nIf you authorized this transaction, no action is needed.\n\nIf you did NOT authorize this payment, please call our fraud team immediately:\n\n1-888-221-1161\n\nDo not click any links. Call us directly. Our team is available 24/7.\n\nPayPal",
    phishing: true,
    explanation: "This is a phone phishing attack (vishing bait). The sender appears as @paypal.com and the email contains no malicious link — making it hard for filters to catch. The trap is the phone number. When you call, you reach a scammer pretending to be PayPal fraud support who walks you through 'reversing' the payment by handing over account access. Real PayPal fraud alerts link to paypal.com/disputes — they don't ask you to call a number in an email.",
    hardReason: "No malicious link at all — the entire attack happens over the phone. Automated filters cannot catch it.",
    time: "9:02 PM",
    avatar: "PP",
    avatarColor: "#003087",
  },
  {
    id: 20,
    hard: true,
    sender: "it-support@yourcompany.com",
    senderName: "IT Support",
    subject: "RE: RE: Password reset — your ticket #88421",
    preview: "Following up on your earlier request — link expires in 2 hours.",
    body: "Hi,\n\nFollowing up on your earlier request (ticket #88421) — your password reset link is ready.\n\n[Previous messages in thread]\n> From: IT Support\n> Sent: Wednesday, May 27\n> Subject: Password reset — your ticket #88421\n>\n> Hi, we received your request. Your reset link will be\n> ready within 24 hours. — IT Support\n\n Click here to set your new password (expires in 2 hours)\n\nIf you have trouble, reply to this email or reach us at the IT help desk on extension 4400.\n\nIT Support\nInternal Help Desk",
    phishing: true,
    explanation: "This is a 'thread hijacking' attack — one of the most dangerous phishing techniques. By forging a fake reply chain, attackers create the illusion that you previously contacted IT support. The quoted messages are entirely fabricated. Red flags: you likely never submitted ticket #88421, and legitimate IT password resets come through your company's official SSO portal, not an email thread.",
    hardReason: "Forged reply thread creates false familiarity. One of the most effective real-world spear phishing techniques.",
    time: "8:37 PM",
    avatar: "IT",
    avatarColor: "#5f6368",
  },
  {
    id: 21,
    hard: true,
    sender: "no-reply@zoom.us",
    senderName: "Zoom",
    subject: "You missed a Zoom meeting",
    preview: "You have a recording of the missed meeting waiting for you.",
    body: "Hi,\n\nYou missed a Zoom meeting that was scheduled for today.\n\nMeeting: Q3 Planning - Leadership Team\nHost: Rachel Okonkwo\nDate: Thursday, May 28 - 2:00 PM\nDuration: 47 minutes\n\nA recording is available. Click below to watch it and review what you missed.\n\n Watch Recording (zoom.us)\n\nThe recording will be available for 30 days. After that, it will be permanently deleted.\n\nZoom Video Communications",
    phishing: true,
    explanation: "The sender and domain look right — @zoom.us is Zoom's real domain. The attack is in the link: the anchor text says 'zoom.us' but in real phishing versions the URL resolves to a credential-harvesting page like zoom-recordings.net. The meeting details are fabricated to seem credible. Always hover over links to check the real URL before clicking.",
    hardReason: "Correct domain, no urgency, plausible meeting context — the deception is entirely in the hidden link destination.",
    time: "8:11 PM",
    avatar: "ZM",
    avatarColor: "#2D8CFF",
  },
  {
    id: 22,
    hard: true,
    sender: "gift@amazon.com",
    senderName: "Amazon",
    subject: "You received a $50 Amazon Gift Card",
    preview: "Someone sent you a gift! Claim your Amazon Gift Card before it expires.",
    body: "Hi,\n\nGreat news — someone sent you a $50 Amazon Gift Card!\n\nGift Card Amount: $50.00\nFrom: A friend\nMessage: \"Enjoy!\"\nExpires: June 4, 2026\n\nTo claim your gift card, sign in to your Amazon account and the balance will be applied automatically.\n\n Claim Your Gift Card\n\nGift cards are non-transferable and cannot be exchanged for cash. See full terms at amazon.com/gc-legal.\n\nAmazon Payments",
    phishing: true,
    explanation: "Amazon does send gift card notifications from @amazon.com — which is exactly why this template is effective. Red flags: the sender is listed as 'A friend' (Amazon shows the actual sender's name); gift cards don't expire in 7 days; and the link leads to a fake Amazon login page. Unexpected gift cards from anonymous senders are a strong phishing signal.",
    hardReason: "Real Amazon domain, no threatening language — greed replaces fear as the manipulation lever.",
    time: "7:50 PM",
    avatar: "AZ",
    avatarColor: "#FF9900",
  },
  {
    id: 23, hard: false,
    sender: "support@netf1ix-billing.com", senderName: "Netflix",
    subject: "Your account will be suspended",
    preview: "We could not validate your payment information. Update now.",
    body: "Dear Member,\n\nWe were unable to validate your payment information for the current billing period.\n\nYour Netflix account will be suspended in 24 hours unless you update your details.\n\n→ Update Billing Info Now\n\nNetflix Support Team",
    phishing: true,
    explanation: "The domain 'netf1ix-billing.com' replaces the letter 'l' with the number '1' — a clear typosquatting attempt. Netflix only sends emails from @netflix.com.",
    hardReason: "", time: "6:12 PM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 24, hard: false,
    sender: "no-reply@spotify.com", senderName: "Spotify",
    subject: "Your Wrapped is here!",
    preview: "Your 2025 Spotify Wrapped is ready. See your top songs and artists.",
    body: "Hey there,\n\nYour 2025 Spotify Wrapped is officially here!\n\nDiscover your top songs, artists, podcasts, and genres from this year.\n\nSee your Wrapped in the Spotify app or on spotify.com/wrapped.\n\nHappy listening,\nThe Spotify Team",
    phishing: false,
    explanation: "Legitimate Spotify promotional email from @spotify.com. It directs you to spotify.com, uses no urgent language, and makes no request for credentials or payment details.",
    hardReason: "", time: "9:00 AM", avatar: "SP", avatarColor: "#1DB954",
  },
  {
    id: 25, hard: false,
    sender: "alerts@paypa1-secure.net", senderName: "PayPal Security",
    subject: "Your account has been limited",
    preview: "Unusual login detected. Restore access immediately.",
    body: "Dear Customer,\n\nYour PayPal account has been limited due to a suspicious login attempt.\n\nTo restore full access, please verify your information within 48 hours.\n\n→ Restore My Account\n\nFailure to verify will result in permanent limitation.\n\nPayPal Security",
    phishing: true,
    explanation: "'paypa1-secure.net' uses a '1' instead of 'l' and a .net TLD. PayPal's real domain is @paypal.com. Threats of permanent limitation are classic pressure tactics.",
    hardReason: "", time: "8:03 AM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 26, hard: false,
    sender: "no-reply@twitter.com", senderName: "X (Twitter)",
    subject: "Someone requested a password reset",
    preview: "A password reset was requested for your account. If this wasn't you, ignore this email.",
    body: "Hi,\n\nSomeone requested a password reset for the X account associated with this email address.\n\nIf you requested this, use the link below:\n→ Reset your password\n\nIf you didn't request a reset, you can safely ignore this email — your password won't change.\n\nX Support Team",
    phishing: false,
    explanation: "Legitimate X (Twitter) password reset email from @twitter.com. It calmly notes you can ignore it if you didn't request it, and doesn't threaten account closure.",
    hardReason: "", time: "3:14 PM", avatar: "X", avatarColor: "#000000",
  },
  {
    id: 27, hard: false,
    sender: "service@bank0famerica-secure.com", senderName: "Bank of America",
    subject: "Immediate action required on your account",
    preview: "We detected suspicious activity. Your account has been temporarily restricted.",
    body: "Dear Customer,\n\nWe have detected suspicious activity on your Bank of America account.\n\nYour account has been temporarily restricted. To restore full access, please verify your identity immediately.\n\n→ Verify Now\n\nIf you do not verify within 24 hours, your account will be closed.\n\nBank of America Fraud Prevention",
    phishing: true,
    explanation: "'bank0famerica-secure.com' substitutes a zero for the letter 'o'. Real Bank of America emails come from @bankofamerica.com. Banks never close accounts via email links.",
    hardReason: "", time: "11:22 AM", avatar: "BA", avatarColor: "#e31837",
  },
  {
    id: 28, hard: false,
    sender: "noreply@adobe.com", senderName: "Adobe",
    subject: "Your Creative Cloud storage is almost full",
    preview: "You've used 95% of your Creative Cloud storage. Manage your files.",
    body: "Hi,\n\nYour Adobe Creative Cloud storage is almost full.\n\nUsed: 95 GB of 100 GB\n\nTo avoid interruptions to your workflow, manage your files or upgrade your storage plan at account.adobe.com.\n\nAdobe",
    phishing: false,
    explanation: "Legitimate Adobe storage notification from @adobe.com. It directs you to account.adobe.com, uses no urgent threats, and does not ask for payment details in the email.",
    hardReason: "", time: "10:05 AM", avatar: "AD", avatarColor: "#FA0F00",
  },
  {
    id: 29, hard: false,
    sender: "verify@applesuport-id.com", senderName: "Apple Support",
    subject: "Your iCloud storage is full — action required",
    preview: "Your iCloud backup failed. Upgrade storage or your data will be lost.",
    body: "Dear Apple User,\n\nYour iCloud storage is full and your last backup failed.\n\nWithout immediate action, your photos, contacts, and documents may be lost.\n\n→ Upgrade Storage Now\n\nYou must act within 3 days to preserve your data.\n\nApple Support Team",
    phishing: true,
    explanation: "'applesuport-id.com' misspells 'support' as 'suport' — a clear sign of a fake domain. All Apple emails come from @apple.com. Apple never threatens data deletion via unsolicited email.",
    hardReason: "", time: "7:33 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 30, hard: false,
    sender: "no-reply@slack.com", senderName: "Slack",
    subject: "You have a new direct message from Maya Singh",
    preview: "Maya Singh sent you a message in Slack.",
    body: "Hi,\n\nMaya Singh sent you a direct message on Slack.\n\nWorkspace: Acme Corp\n\nOpen Slack to read and reply to Maya's message. Don't have the app? Visit slack.com to access your workspace.\n\nThe Slack Team",
    phishing: false,
    explanation: "Legitimate Slack notification from @slack.com. It directs you to slack.com, asks for no credentials in the email, and uses standard Slack notification format.",
    hardReason: "", time: "2:17 PM", avatar: "SL", avatarColor: "#4A154B",
  },
  {
    id: 31, hard: false,
    sender: "billing@netf1ix-account-update.info", senderName: "Netflix",
    subject: "Payment declined — last warning",
    preview: "This is your final notice before account termination.",
    body: "FINAL WARNING\n\nDear Customer,\n\nThis is your FINAL NOTICE. Your Netflix subscription payment has been declined THREE TIMES.\n\nYour account will be PERMANENTLY TERMINATED in 6 hours.\n\n→ Pay Now to Keep Your Account\n\nDo not ignore this message.\n\nNetflix Billing",
    phishing: true,
    explanation: "Multiple red flags: fake domain with '1' instead of 'l' and .info TLD, ALL CAPS threats, and an absurd 6-hour deadline. Netflix never uses this communication style.",
    hardReason: "", time: "5:55 AM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 32, hard: false,
    sender: "noreply@coinbase.com", senderName: "Coinbase",
    subject: "Your Coinbase account: identity verification required",
    preview: "Please complete identity verification to continue using Coinbase.",
    body: "Hi,\n\nTo comply with financial regulations, we periodically require users to re-verify their identity.\n\nThis is a routine check. Please complete verification through the Coinbase app or at coinbase.com/verify by May 31, 2026.\n\nYour account will remain fully accessible while you complete this step.\n\nCoinbase Support",
    phishing: false,
    explanation: "Legitimate Coinbase KYC compliance request from @coinbase.com. Note that it says your account remains accessible, gives a reasonable deadline, and directs you to coinbase.com/verify — not a third-party site.",
    hardReason: "", time: "9:20 AM", avatar: "CB", avatarColor: "#0052FF",
  },
  {
    id: 33, hard: false,
    sender: "no-reply@welbsfargo-secure.com", senderName: "Wells Fargo",
    subject: "Suspicious login attempt on your account",
    preview: "We blocked a login from an unknown device. Verify your identity.",
    body: "Dear Wells Fargo Customer,\n\nA sign-in attempt from an unrecognized device was blocked on your account.\n\nDate: May 28, 2026\nDevice: Unknown\nLocation: Miami, FL\n\nPlease verify your identity immediately.\n\n→ Verify My Identity\n\nWells Fargo Security",
    phishing: true,
    explanation: "'welbsfargo-secure.com' misspells Wells Fargo and adds a suspicious '-secure' suffix. Wells Fargo emails come from @wellsfargo.com.",
    hardReason: "", time: "6:44 AM", avatar: "WF", avatarColor: "#D71E28",
  },
  {
    id: 34, hard: false,
    sender: "updates@figma.com", senderName: "Figma",
    subject: "New comment on your design",
    preview: "Marcus Lee left a comment on 'Homepage Redesign v3'.",
    body: "Hi,\n\nMarcus Lee commented on a file you're working on.\n\nFile: Homepage Redesign v3\nComment: \"Can we try a lighter background for the hero section? This feels a bit heavy.\"\n\nReply or view the comment at figma.com.\n\nThe Figma Team",
    phishing: false,
    explanation: "Legitimate Figma collaboration notification from @figma.com. It directs you to figma.com, contains no credential requests, and mirrors Figma's real comment notification format.",
    hardReason: "", time: "11:47 AM", avatar: "FG", avatarColor: "#F24E1E",
  },
  {
    id: 35, hard: false,
    sender: "support@amazn-prime-renewal.com", senderName: "Amazon Prime",
    subject: "Your Prime membership renews tomorrow",
    preview: "Your Amazon Prime membership will be charged $139. Update payment if needed.",
    body: "Dear Prime Member,\n\nYour Amazon Prime membership renews tomorrow.\n\nCharge amount: $139.00\nPayment method: Visa ending in ****\n\nIf your payment information has changed, please update it now.\n\n→ Update Payment Method\n\nAmazon Prime Team",
    phishing: true,
    explanation: "'amazn-prime-renewal.com' removes the 'o' from Amazon and adds a hyphenated renewal suffix. All Amazon emails come from @amazon.com.",
    hardReason: "", time: "8:30 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 36, hard: false,
    sender: "security@apple.com", senderName: "Apple",
    subject: "Receipt for your App Store purchase",
    preview: "You were billed $4.99 for Headspace: Mindful Meditation.",
    body: "Dear Customer,\n\nThank you for your purchase.\n\nDate: May 28, 2026\nItem: Headspace: Mindful Meditation — Monthly\nAmount: $4.99\n\nIf you did not make this purchase, visit reportaproblem.apple.com to request a refund.\n\nApple",
    phishing: false,
    explanation: "Legitimate Apple App Store receipt from @apple.com. The refund process directs you to reportaproblem.apple.com (Apple's real refund portal), and it contains no links asking for your password.",
    hardReason: "", time: "12:01 PM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 37, hard: false,
    sender: "hr@yourcompany-payroll-portal.xyz", senderName: "HR Department",
    subject: "Important: Update your direct deposit information",
    preview: "Payroll system migration — update your banking details by Friday.",
    body: "Dear Employee,\n\nDue to our payroll system migration, all employees must update their direct deposit banking information by Friday, May 30.\n\nFailure to update will result in a delay in your next paycheck.\n\n→ Update Banking Details Now\n\nHR Department",
    phishing: true,
    explanation: "No legitimate HR department uses a .xyz domain for payroll communications. This is a direct deposit fraud attempt — updating your bank details on a fake site redirects your paycheck to attackers.",
    hardReason: "", time: "9:45 AM", avatar: "HR", avatarColor: "#5f6368",
  },
  {
    id: 38, hard: false,
    sender: "noreply@uber.com", senderName: "Uber",
    subject: "Your receipt from Uber",
    preview: "Thanks for riding with Uber. Here's your receipt.",
    body: "Thanks for riding with Uber!\n\nTrip details:\nDate: May 28, 2026\nFrom: 42 Elm Street\nTo: JFK Airport Terminal 4\nDistance: 18.2 miles\nTotal: $54.80\n\nQuestions? Visit help.uber.com.\n\nUber",
    phishing: false,
    explanation: "Legitimate Uber trip receipt from @uber.com. It contains no links asking for login credentials, directs support questions to help.uber.com, and matches Uber's standard receipt format.",
    hardReason: "", time: "4:22 PM", avatar: "UB", avatarColor: "#000000",
  },
  {
    id: 39, hard: false,
    sender: "billing@microsft-365-renewal.com", senderName: "Microsoft 365",
    subject: "Your Microsoft 365 subscription has expired",
    preview: "Renew now to avoid losing access to Word, Excel, and Outlook.",
    body: "Dear Customer,\n\nYour Microsoft 365 subscription has expired. You no longer have access to Word, Excel, Outlook, or OneDrive.\n\nRenew your subscription today to restore full access.\n\n→ Renew Microsoft 365 Now\n\nMicrosoft 365 Team",
    phishing: true,
    explanation: "'microsft-365-renewal.com' omits the 'o' in Microsoft. Microsoft subscription emails come from @microsoft.com.",
    hardReason: "", time: "7:15 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 40, hard: false,
    sender: "notifications@airbnb.com", senderName: "Airbnb",
    subject: "Your upcoming trip to Barcelona — check-in info",
    preview: "Your stay at Casa Bonita starts in 3 days. Here's what you need to know.",
    body: "Hi,\n\nYour trip to Barcelona is coming up!\n\nProperty: Casa Bonita — Eixample District\nCheck-in: June 1, 2026 after 3:00 PM\nCheck-out: June 8, 2026 by 11:00 AM\nHost: Rosa M.\n\nFind everything at airbnb.com/trips.\n\nHave a great trip!\nAirbnb",
    phishing: false,
    explanation: "Legitimate Airbnb trip confirmation from @airbnb.com. It directs you to airbnb.com/trips for details and contains no requests for payment or credentials.",
    hardReason: "", time: "10:30 AM", avatar: "AB", avatarColor: "#FF5A5F",
  },
  {
    id: 41, hard: false,
    sender: "irs-refund@tax-gov-irs.net", senderName: "IRS Tax Refund",
    subject: "You have a pending tax refund of $847.00",
    preview: "The IRS has processed your refund. Claim it now.",
    body: "INTERNAL REVENUE SERVICE\n\nDear Taxpayer,\n\nYou have a pending federal tax refund of $847.00.\n\nTo receive your refund, please verify your identity and banking information.\n\n→ Claim My Refund\n\nThis refund will expire if not claimed within 5 business days.\n\nInternal Revenue Service",
    phishing: true,
    explanation: "The IRS never contacts taxpayers by email to notify them of refunds. The domain 'tax-gov-irs.net' is not a government domain — all IRS sites end in .gov.",
    hardReason: "", time: "11:03 AM", avatar: "IR", avatarColor: "#004B87",
  },
  {
    id: 42, hard: false,
    sender: "no-reply@zoom.us", senderName: "Zoom",
    subject: "Your Zoom Pro subscription is active",
    preview: "Your subscription renews on June 15, 2026. Manage your plan at zoom.us.",
    body: "Hi,\n\nThis is a confirmation that your Zoom Pro subscription is active.\n\nPlan: Zoom Pro\nBilling cycle: Monthly\nNext renewal: June 15, 2026\nAmount: $15.99/month\n\nTo manage your subscription, visit zoom.us/billing.\n\nZoom",
    phishing: false,
    explanation: "Legitimate Zoom subscription confirmation from @zoom.us. It directs you to zoom.us/billing, does not ask for any information, and uses calm neutral language.",
    hardReason: "", time: "1:00 PM", avatar: "ZM", avatarColor: "#2D8CFF",
  },
  {
    id: 43, hard: false,
    sender: "accounts@paIpal.com", senderName: "PayPal",
    subject: "Verify your email address",
    preview: "Please confirm your email to keep using PayPal.",
    body: "Dear Customer,\n\nWe need you to confirm your email address to continue using your PayPal account.\n\nClick below to verify:\n→ Confirm Email Address\n\nIf you did not create a PayPal account, you can ignore this email.\n\nPayPal",
    phishing: true,
    explanation: "Look closely: 'paIpal.com' uses a capital 'I' (letter i) instead of a lowercase 'l'. This is a homograph attack — the domain looks identical in many fonts. The real PayPal domain is paypal.com.",
    hardReason: "", time: "3:45 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 44, hard: false,
    sender: "team@trello.com", senderName: "Trello",
    subject: "Sarah added you to the board 'Product Roadmap Q3'",
    preview: "You've been added to a new Trello board.",
    body: "Hi,\n\nSarah Kim added you to the Trello board 'Product Roadmap Q3'.\n\nYou can now view and contribute to this board. Open it in Trello at trello.com.\n\nThe Trello Team",
    phishing: false,
    explanation: "Legitimate Trello board invitation from @trello.com. It directs you to trello.com, requires no credential input from the email, and matches Trello's standard invitation format.",
    hardReason: "", time: "9:55 AM", avatar: "TR", avatarColor: "#0052CC",
  },
  {
    id: 45, hard: false,
    sender: "noreply@amazon-delivery-alert.org", senderName: "Amazon Delivery",
    subject: "Your package could not be delivered",
    preview: "Delivery attempt failed. Reschedule or your package will be returned.",
    body: "Dear Customer,\n\nWe attempted to deliver your package today but were unable to complete the delivery.\n\nTracking #: 1Z999AA10123456784\n\nYou must reschedule your delivery within 48 hours or your package will be returned.\n\n→ Reschedule Delivery\n\nAmazon Logistics",
    phishing: true,
    explanation: "'amazon-delivery-alert.org' is not Amazon's domain. Real Amazon delivery notifications come from @amazon.com. The .org TLD is unusual for a commercial delivery service.",
    hardReason: "", time: "2:10 PM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 46, hard: false,
    sender: "donotreply@wellsfargo.com", senderName: "Wells Fargo",
    subject: "Your statement is ready",
    preview: "Your May 2026 statement is now available online.",
    body: "Dear Customer,\n\nYour May 2026 statement is now available.\n\nSign in to Wells Fargo Online at wellsfargo.com to view your statement.\n\nDo not reply to this email — this mailbox is not monitored.\n\nWells Fargo Bank",
    phishing: false,
    explanation: "Legitimate Wells Fargo statement notification from @wellsfargo.com. It directs you to wellsfargo.com and does not include a direct login link.",
    hardReason: "", time: "8:00 AM", avatar: "WF", avatarColor: "#D71E28",
  },
  {
    id: 47, hard: false,
    sender: "info@fedex-tracking-update.co", senderName: "FedEx",
    subject: "Delivery failed — customs fee required",
    preview: "Your FedEx package is held at customs. Pay $3.49 to release it.",
    body: "Dear Recipient,\n\nYour FedEx package has been held at a customs facility.\n\nTracking: 7489348294830\nStatus: HELD — CUSTOMS FEE OUTSTANDING\n\nA customs processing fee of $3.49 is required to release your shipment.\n\n→ Pay Customs Fee ($3.49)\n\nFedEx Express",
    phishing: true,
    explanation: "'fedex-tracking-update.co' is not FedEx's real domain (@fedex.com). The 'small customs fee' trick is extremely common — attackers profit from credit card data entered on the fake payment page, not just the $3.49.",
    hardReason: "", time: "12:55 PM", avatar: "FX", avatarColor: "#4D148C",
  },
  {
    id: 48, hard: false,
    sender: "noreply@pinterest.com", senderName: "Pinterest",
    subject: "New ideas based on your recent saves",
    preview: "We found 12 new Pins you might like.",
    body: "Hi,\n\nBased on your recent saves, we found some new ideas for you.\n\n12 new Pins in: Kitchen Renovation, Minimalist Interiors, and Outdoor Spaces\n\nOpen Pinterest to see your personalized recommendations.\n\nThe Pinterest Team",
    phishing: false,
    explanation: "Legitimate Pinterest recommendation email from @pinterest.com. Contains no login prompt, no urgency, and directs you to open the Pinterest app.",
    hardReason: "", time: "7:02 AM", avatar: "PI", avatarColor: "#E60023",
  },
  // --- HARD ---
  {
    id: 49, hard: true,
    sender: "security@accounts.google.com", senderName: "Google",
    subject: "Your password was changed",
    preview: "Your Google Account password was recently changed.",
    body: "Hi,\n\nYour Google Account password was changed.\n\nDate: May 28, 2026 at 6:12 PM\nDevice: MacBook Pro — Safari — San Francisco, CA\n\nIf you made this change, no action is needed.\n\nIf you didn't change your password, go to myaccount.google.com immediately and review your security settings.\n\nGoogle Security Team",
    phishing: false,
    explanation: "Legitimate Google security notification from @accounts.google.com — a real Google subdomain. It makes no request for credentials, provides no direct login link, and gives you a real URL to check your account directly.",
    hardReason: "Real Google subdomain, alarming content, no suspicious links — feels dangerous but is entirely legitimate.",
    time: "6:14 PM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 50, hard: true,
    sender: "hr@company.com", senderName: "HR Team",
    subject: "Your compensation review results",
    preview: "Your 2026 salary adjustment letter is attached. Please review.",
    body: "Hi,\n\nYour 2026 annual compensation review has been completed.\n\nPlease find your salary adjustment letter attached to this email. The document requires your electronic signature — use the link below to sign:\n\n→ Review & Sign Your Compensation Letter\n\nThis must be completed by May 31. If you have questions, reach out to your HR business partner.\n\nHR Team",
    phishing: true,
    explanation: "This is a spear phishing email targeting employees during annual reviews. The attack is the signing link, which leads to a credential harvest page. Real compensation letters are signed through official HR platforms like Workday or BambooHR — not via emailed links.",
    hardReason: "Perfectly timed to review season, sender could match a real company domain, and the task (e-signing) feels routine.",
    time: "4:00 PM", avatar: "HR", avatarColor: "#5f6368",
  },
  {
    id: 51, hard: true,
    sender: "no-reply@github.com", senderName: "GitHub",
    subject: "A new SSH key was added to your account",
    preview: "A new SSH key was added to your account from an unrecognized device.",
    body: "Hi,\n\nA new SSH key was added to your GitHub account.\n\nKey fingerprint: SHA256:3vT9...kQpL\nAdded from: San Jose, CA\nDate: May 28, 2026 at 8:43 PM\n\nIf you added this key, no action is needed.\n\nIf you didn't add this key, immediately remove it at github.com/settings/keys and review your account activity.\n\nGitHub Security",
    phishing: false,
    explanation: "Legitimate GitHub security alert from @github.com. No credential link in the email — it tells you to go directly to github.com/settings/keys.",
    hardReason: "Alarming content about account compromise. Users who don't recognize the key may panic and click a phishing link they think is this email.",
    time: "8:45 PM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 52, hard: true,
    sender: "noreply@mail.instagram.com", senderName: "Instagram",
    subject: "We noticed an unusual login to your account",
    preview: "A login from Lagos, Nigeria. Was this you?",
    body: "Hi,\n\nWe noticed a login to your Instagram account from a device we don't recognize.\n\nLocation: Lagos, Nigeria\nDevice: Android — Chrome\nDate: May 28, 2026 at 10:01 PM\n\nIf this was you, you can ignore this email. If this wasn't you, secure your account at instagram.com/accounts/login/.\n\nInstagram Security",
    phishing: false,
    explanation: "Legitimate Instagram security alert from @mail.instagram.com, Instagram's real notification subdomain. It directs you to instagram.com, not an external URL.",
    hardReason: "The subdomain mail.instagram.com looks suspicious to many users who expect @instagram.com, but it is Instagram's real sending domain.",
    time: "10:03 PM", avatar: "IG", avatarColor: "#C13584",
  },
  {
    id: 53, hard: true,
    sender: "billing@stripe.com", senderName: "Stripe",
    subject: "Payment failed for your Stripe subscription",
    preview: "We were unable to charge your card. Update your payment method.",
    body: "Hi,\n\nWe were unable to process the payment for your Stripe account subscription.\n\nAmount: $35.00/month\nFailed charge date: May 28, 2026\nCard ending in: 4242\n\nTo update your payment method, visit dashboard.stripe.com/settings/billing.\n\nStripe",
    phishing: false,
    explanation: "Legitimate Stripe billing notification from @stripe.com. The email directs you to dashboard.stripe.com (a real Stripe subdomain) rather than a third-party site.",
    hardReason: "Stripe is a payment processor; users may assume a Stripe billing email is trying to steal card details. But this one is real.",
    time: "9:11 AM", avatar: "ST", avatarColor: "#635BFF",
  },
  {
    id: 54, hard: true,
    sender: "noreply@venmo.com", senderName: "Venmo",
    subject: "Jordan sent you $250",
    preview: "Jordan P. sent you $250 with a note: 'For the tickets'",
    body: "Hi,\n\nJordan P. sent you $250.00.\n\nNote: 'For the tickets'\n\nThe money has been added to your Venmo balance. You can transfer it to your bank at any time from the Venmo app or at venmo.com.\n\nVenmo",
    phishing: false,
    explanation: "Legitimate Venmo payment notification from @venmo.com. Venmo payments are automatically added to your balance — the email directs you to the app or venmo.com.",
    hardReason: "Unexpected money notifications from unknown senders can feel like a prelude to a scam, but this email itself is legitimate.",
    time: "3:08 PM", avatar: "VM", avatarColor: "#3D95CE",
  },
  {
    id: 55, hard: true,
    sender: "noreply@microsoft.com", senderName: "Microsoft",
    subject: "Action needed: unusual sign-in to your Microsoft account",
    preview: "We detected a sign-in from Minsk, Belarus. Review activity.",
    body: "Microsoft account\n\nUnusual sign-in activity\n\nWe detected something unusual about a recent sign-in to the Microsoft account.\n\nCountry/region: Belarus\nIP address: 195.88.xxx.xxx\nDate: May 28, 2026\n\nIf you think someone else signed in, go to account.microsoft.com to review your recent activity and change your password.\n\nThe Microsoft account team",
    phishing: false,
    explanation: "Legitimate Microsoft security alert from @microsoft.com. It directs you to account.microsoft.com and does not embed a direct login link.",
    hardReason: "Foreign country, specific IP — very alarming content that can cause users to click impulsively.",
    time: "11:18 PM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 56, hard: true,
    sender: "no-reply@dropbox.com", senderName: "Dropbox",
    subject: "Someone signed in from a new device",
    preview: "A new sign-in to your Dropbox account was detected.",
    body: "Hi,\n\nA new sign-in to your Dropbox account was detected.\n\nDevice: Windows PC\nLocation: Chicago, IL\nTime: May 28, 2026 at 7:22 PM\n\nIf this was you, no action is required.\n\nIf this wasn't you, secure your account at dropbox.com/account/security.\n\nDropbox",
    phishing: false,
    explanation: "Legitimate Dropbox security notification from @dropbox.com. It directs you to dropbox.com/account/security and matches Dropbox's standard security alert format.",
    hardReason: "Correct domain, new-device alert — hard to distinguish from phishing versions of the same template.",
    time: "7:24 PM", avatar: "DB", avatarColor: "#0061ff",
  },
  {
    id: 57, hard: true,
    sender: "do-not-reply@amazon.com", senderName: "Amazon",
    subject: "Your Amazon account: email address changed",
    preview: "The email address on your Amazon account was recently changed.",
    body: "Hello,\n\nThe email address associated with your Amazon account was changed.\n\nIf you made this change, you can disregard this email.\n\nIf you did not make this change, please secure your account immediately. Visit amazon.com/gp/css/account/info/edit.html to review your account details.\n\nAmazon\n\nDo not share this message.",
    phishing: false,
    explanation: "Legitimate Amazon account change notification from @amazon.com. It directs you to amazon.com directly and contains no embedded login link.",
    hardReason: "Alarming content (email change you didn't request) from a real domain — users may dismiss it as phishing right when they should be acting on it.",
    time: "5:44 PM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 58, hard: true,
    sender: "security@paypal.com", senderName: "PayPal",
    subject: "Your account access has been limited",
    preview: "We've noticed some unusual activity. Please resolve the issue.",
    body: "Dear Customer,\n\nWe've noticed some unusual activity in your PayPal account and have limited your access as a precaution.\n\nTo restore full access, please log in to your PayPal account and follow the steps we've outlined.\n\nLog in at paypal.com to get started. Do not click links in emails — always go directly to paypal.com.\n\nPayPal",
    phishing: false,
    explanation: "Legitimate PayPal account limitation notice from @paypal.com. Crucially, the email tells you NOT to click email links and to go directly to paypal.com — exactly what a legitimate PayPal security email would say.",
    hardReason: "Real PayPal domain, real-sounding account limitation scenario. Easy to confuse with the many fake PayPal limitation emails that do the opposite.",
    time: "2:33 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 59, hard: false,
    sender: "giveaway@apple-winner-2026.com", senderName: "Apple",
    subject: "Congratulations! You won an iPhone 16 Pro",
    preview: "You have been selected as a winner. Claim your prize today.",
    body: "CONGRATULATIONS!\n\nDear Lucky Winner,\n\nYou have been selected as the winner of an Apple iPhone 16 Pro (256GB)!\n\nTo claim your prize, please verify your shipping address and pay a small processing fee of $9.99.\n\n→ Claim My iPhone 16 Pro\n\nThis offer expires in 24 hours.\n\nApple Rewards Team",
    phishing: true,
    explanation: "Apple does not run random prize giveaways. 'apple-winner-2026.com' is not Apple's domain. Requesting a 'processing fee' for a prize is a classic advance-fee fraud technique.",
    hardReason: "", time: "10:00 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 60, hard: false,
    sender: "support@microsofft-helpdesk.com", senderName: "Microsoft Support",
    subject: "Your Windows license has expired",
    preview: "Your Windows 11 license is no longer valid. Renew immediately.",
    body: "Dear Windows User,\n\nYour Windows 11 license has expired and your PC is now running in reduced functionality mode.\n\nTo restore full functionality, please renew your license immediately.\n\n→ Renew Windows License\n\nMicrosoft Support",
    phishing: true,
    explanation: "'microsofft-helpdesk.com' doubles the 'f' in Microsoft. Windows license renewals happen through the Windows Settings app or microsoft.com, never via unsolicited email.",
    hardReason: "", time: "8:48 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 61, hard: false,
    sender: "notify@etsy.com", senderName: "Etsy",
    subject: "Your order has shipped!",
    preview: "Great news — your Etsy order is on its way.",
    body: "Your order has shipped!\n\nOrder: Handmade Ceramic Mug Set (Set of 4)\nSeller: PotteryByClara\nTracking: USPS — 9400111899223397978965\nEstimated delivery: June 2–4, 2026\n\nTrack your package at etsy.com/purchases.\n\nEtsy",
    phishing: false,
    explanation: "Legitimate Etsy shipping confirmation from @etsy.com. It directs you to etsy.com/purchases for tracking and contains no credential requests.",
    hardReason: "", time: "9:38 AM", avatar: "ET", avatarColor: "#F16521",
  },
  {
    id: 62, hard: false,
    sender: "prize@samsung-loyalty-reward.net", senderName: "Samsung",
    subject: "You've earned 5,000 Samsung loyalty points — redeem now",
    preview: "Your points are expiring! Redeem before midnight.",
    body: "Dear Samsung Customer,\n\nYou've accumulated 5,000 Samsung loyalty points that are about to expire.\n\nRedeem your points for exclusive rewards including Samsung Galaxy products, accessories, and gift cards.\n\n→ Redeem Points Now (expires at midnight)\n\nSamsung Rewards Team",
    phishing: true,
    explanation: "'samsung-loyalty-reward.net' is not Samsung's domain. Samsung's real rewards program is at samsung.com. The midnight expiration pressure is a classic urgency tactic.",
    hardReason: "", time: "11:11 AM", avatar: "SG", avatarColor: "#1428A0",
  },
  {
    id: 63, hard: false,
    sender: "noreply@twitch.tv", senderName: "Twitch",
    subject: "Your Twitch Affiliate payment is ready",
    preview: "Your June payout of $43.22 has been processed.",
    body: "Hi,\n\nYour Twitch Affiliate payout for May 2026 has been processed.\n\nAmount: $43.22\nPayment method: PayPal\nProcessing time: 3–5 business days\n\nView your payout history at dashboard.twitch.tv/revenue.\n\nTwitch",
    phishing: false,
    explanation: "Legitimate Twitch payout notification from @twitch.tv. It directs you to dashboard.twitch.tv (a real Twitch subdomain) and contains no credential request.",
    hardReason: "", time: "10:00 AM", avatar: "TW", avatarColor: "#9146FF",
  },
  {
    id: 64, hard: false,
    sender: "security@chasebanksecure-login.com", senderName: "Chase",
    subject: "One-time passcode for Chase QuickPay",
    preview: "Your one-time passcode is 847291. Do not share this code.",
    body: "Chase\n\nYour one-time passcode for Chase QuickPay verification:\n\n847291\n\nThis code expires in 10 minutes. If you did not request this code, please call Chase immediately at 1-800-935-9935.\n\nChase Security",
    phishing: true,
    explanation: "'chasebanksecure-login.com' is not Chase's domain. Chase emails come from @chase.com. This is a real-time phishing attack — an attacker on a fake site triggered a Chase OTP and is forwarding it to you to complete their login.",
    hardReason: "", time: "6:02 PM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 65, hard: false,
    sender: "noreply@hulu.com", senderName: "Hulu",
    subject: "Welcome back to Hulu!",
    preview: "Your Hulu subscription has been reactivated. Here's what's new.",
    body: "Hi,\n\nWelcome back! Your Hulu subscription has been successfully reactivated.\n\nYour plan: Hulu (With Ads) — $7.99/month\nNext billing date: June 28, 2026\n\nLog in to start watching at hulu.com.\n\nThe Hulu Team",
    phishing: false,
    explanation: "Legitimate Hulu reactivation confirmation from @hulu.com. It directs you to hulu.com and contains no credential request.",
    hardReason: "", time: "3:30 PM", avatar: "HU", avatarColor: "#1CE783",
  },
  {
    id: 66, hard: false,
    sender: "support@paypaI-resolution.com", senderName: "PayPal",
    subject: "Dispute opened on your account",
    preview: "A buyer has opened a dispute for $178.00. Respond within 10 days.",
    body: "Dear PayPal Seller,\n\nA buyer has opened a dispute on a transaction in your account.\n\nAmount in dispute: $178.00\nItem: Vintage Camera Lens\nDispute reason: Item not as described\n\nYou have 10 days to respond.\n\n→ Respond to Dispute\n\nPayPal Resolution Center",
    phishing: true,
    explanation: "'paypaI-resolution.com' uses a capital letter 'I' instead of lowercase 'l' — a homograph attack nearly invisible in many fonts. The real PayPal domain is paypal.com.",
    hardReason: "", time: "4:12 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 67, hard: true,
    sender: "noreply@accounts.youtube.com", senderName: "YouTube",
    subject: "Your YouTube channel has been flagged for review",
    preview: "Content on your channel has been flagged. Review the notice.",
    body: "Hi,\n\nOne of your videos has been flagged for a potential Community Guidelines violation and is under review.\n\nVideo: 'How I Trained for a Marathon in 90 Days'\nReason: Potential misleading health content\n\nYour video remains public during review. No action is required right now.\n\nReview our Community Guidelines at support.google.com/youtube.\n\nYouTube Team",
    phishing: false,
    explanation: "Legitimate YouTube content review notice from @accounts.youtube.com. It requires no action, directs you to support.google.com/youtube, and does not ask for credentials or payment.",
    hardReason: "YouTube does send from accounts.youtube.com, which looks unusual. Combined with an alarming content violation notice, users often assume this is phishing.",
    time: "12:20 PM", avatar: "YT", avatarColor: "#FF0000",
  },
  {
    id: 68, hard: true,
    sender: "donotreply@intuit.com", senderName: "TurboTax",
    subject: "Your 2025 tax return has been rejected by the IRS",
    preview: "The IRS rejected your federal return. You must refile by June 1.",
    body: "Hi,\n\nThe IRS has rejected your 2025 federal tax return.\n\nRejection code: IND-031-04\nReason: A return with the same SSN has already been filed.\n\nThis may indicate that someone filed a return using your Social Security Number. You should:\n1. Contact the IRS at 1-800-908-4490\n2. File IRS Form 14039 (Identity Theft Affidavit)\n3. Refile your return through TurboTax\n\nVisit turbotax.intuit.com for assistance.\n\nTurboTax / Intuit",
    phishing: false,
    explanation: "Legitimate TurboTax notification from @intuit.com (Intuit is TurboTax's parent company). Rejection code IND-031-04 is real. The email provides IRS contact info and the correct Intuit domain.",
    hardReason: "Terrifying content — potential identity theft — combined with an unfamiliar @intuit.com domain instead of @turbotax.com.",
    time: "8:05 AM", avatar: "TT", avatarColor: "#009F6B",
  },
  {
    id: 69, hard: true,
    sender: "security@twitter.com", senderName: "X (Twitter)",
    subject: "Your account has been temporarily suspended",
    preview: "Your account was suspended due to unusual activity. Appeal to restore access.",
    body: "Hi,\n\nYour X account has been temporarily suspended for unusual activity.\n\nTo appeal this suspension and restore your account, please complete the identity verification process:\n\n→ Start Appeal Process\n\nYour appeal must be submitted within 14 days. After that, the suspension may become permanent.\n\nX Safety Team",
    phishing: true,
    explanation: "Despite showing @twitter.com as the sender, the embedded appeal link leads to a fake X login page. X's actual suspension appeals are handled at help.twitter.com/forms/general — they never contain a direct 'Start Appeal' button linking outside Twitter's infrastructure.",
    hardReason: "Real-looking sender domain with an appeal process that seems procedurally correct. The deception is entirely in the link destination.",
    time: "1:45 PM", avatar: "X", avatarColor: "#000000",
  },
  {
    id: 70, hard: true,
    sender: "no-reply@service.paypal.com", senderName: "PayPal",
    subject: "Heads up: you sent a payment",
    preview: "You sent $499.00 to CryptoTradeDesk LLC.",
    body: "Hi,\n\nYou sent a payment.\n\nAmount: $499.00 USD\nTo: CryptoTradeDesk LLC\nDate: May 28, 2026\nTransaction ID: 3KF87201MP492010P\n\nIf you authorized this payment, no action is needed.\n\nIf you did NOT send this payment, please report unauthorized activity at paypal.com/disputes.\n\nPayPal",
    phishing: false,
    explanation: "Legitimate PayPal payment confirmation from @service.paypal.com, a real PayPal subdomain. It directs you to paypal.com/disputes. This exact template is widely cloned for phishing, but this version is authentic.",
    hardReason: "PayPal does send from service.paypal.com. The scary payment amount makes users want to click something immediately — but the email itself is real.",
    time: "10:22 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 71, hard: true,
    sender: "mailer@trello.com", senderName: "Trello",
    subject: "You've been added to a board: 2026 Acquisition Targets",
    preview: "Marcus Reid added you to a confidential board on Trello.",
    body: "Hi,\n\nMarcus Reid (m.reid@capitalventures.com) has added you to the Trello board '2026 Acquisition Targets'.\n\nThis board has been set to private. You will need to accept the invitation to access it.\n\n→ Accept Invitation & View Board\n\nIf you don't recognize Marcus Reid, you can report this email.\n\nTrello",
    phishing: true,
    explanation: "While @trello.com is the real Trello domain, attackers abuse Trello's real notification system to send malicious board invitations — the board itself contains a link to a credential-harvesting page. This is a 'living off trusted infrastructure' attack.",
    hardReason: "Sent through real Trello infrastructure from the real domain. The threat is entirely inside the linked board, not the email itself.",
    time: "11:33 AM", avatar: "TR", avatarColor: "#0052CC",
  },
  {
    id: 72, hard: true,
    sender: "billing@apple.com", senderName: "Apple",
    subject: "Your Apple ID was used to make a purchase",
    preview: "A purchase of $299.99 was made with your Apple ID.",
    body: "Dear Customer,\n\nYour Apple ID was used to purchase Apple Music Family Plan — 1 Year.\n\nAmount: $299.99\nDate: May 28, 2026\n\nIf you did not make this purchase, visit reportaproblem.apple.com to request a refund and review your account security.\n\nApple",
    phishing: false,
    explanation: "Legitimate Apple purchase notification from @apple.com. It directs you to reportaproblem.apple.com (Apple's real refund portal) and contains no inline login link.",
    hardReason: "Unexpectedly large purchase amount creates panic. Users may confuse this with common Apple purchase phishing emails.",
    time: "9:47 PM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 73, hard: false,
    sender: "info@linkedln-career-alerts.com", senderName: "LinkedIn Jobs",
    subject: "You have 7 new job matches",
    preview: "New jobs matching your profile: Senior Product Manager, UX Lead...",
    body: "Hi,\n\nBased on your profile, we found 7 new jobs that match your skills:\n\n• Senior Product Manager — Stripe\n• UX Lead — Airbnb\n• Growth Manager — OpenAI\n\nReview your matches and apply now.\n\n→ View Job Matches\n\nLinkedIn Jobs Team",
    phishing: true,
    explanation: "'linkedln-career-alerts.com' swaps the 'i' for 'l' in LinkedIn — a subtle homograph. Real LinkedIn job alerts come from @linkedin.com.",
    hardReason: "", time: "8:20 AM", avatar: "LI", avatarColor: "#0a66c2",
  },
  {
    id: 74, hard: false,
    sender: "receipts@squareup.com", senderName: "Square",
    subject: "Receipt for your purchase at Blue Bottle Coffee",
    preview: "You were charged $6.25 at Blue Bottle Coffee.",
    body: "Hi,\n\nHere's your receipt from Blue Bottle Coffee.\n\nDate: May 28, 2026\nItem: Iced Latte (Large)\nTotal: $6.25\nPaid with: Visa ending in 4829\n\nQuestions? Visit squareup.com/help or contact the merchant directly.\n\nSquare",
    phishing: false,
    explanation: "Legitimate Square payment receipt from @squareup.com, Square's real domain. Contains no login prompt and matches Square's standard receipt format.",
    hardReason: "", time: "11:05 AM", avatar: "SQ", avatarColor: "#3E4348",
  },
  {
    id: 75, hard: false,
    sender: "admin@docu-sign-verify.co", senderName: "DocuSign",
    subject: "Sign requested: Employment Agreement",
    preview: "James Carter has sent you a document to sign via DocuSign.",
    body: "James Carter (j.carter@newemployer.com) has sent you a document via DocuSign.\n\nDocument: Employment Agreement — Start Date June 1, 2026\n\nThis document requires your signature by May 31, 2026.\n\n→ REVIEW AND SIGN\n\nDocuSign — The world's #1 e-signature solution",
    phishing: true,
    explanation: "'docu-sign-verify.co' is not DocuSign's domain. Real DocuSign notifications come from @docusign.net or @docusign.com. The hyphenated fake domain with a .co TLD is a clear red flag.",
    hardReason: "", time: "2:44 PM", avatar: "DS", avatarColor: "#FFCC00",
  },
  {
    id: 76, hard: false,
    sender: "noreply@github.com", senderName: "GitHub",
    subject: "Your pull request was merged",
    preview: "[repo] PR #247 'Add dark mode support' was merged by jsmith.",
    body: "Hi,\n\nPull request #247 'Add dark mode support' was merged into main on your repository.\n\nMerged by: jsmith\nRepository: yourorg/yourapp\nTime: May 28, 2026 at 2:18 PM\n\nView the merged pull request at github.com/yourorg/yourapp/pull/247.\n\nGitHub",
    phishing: false,
    explanation: "Legitimate GitHub pull request notification from @github.com. It directs you to github.com and contains no credential request.",
    hardReason: "", time: "2:20 PM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 77, hard: false,
    sender: "verification@roblox-gift-promo.com", senderName: "Roblox",
    subject: "You received 10,000 free Robux!",
    preview: "Claim your free Robux before the offer expires.",
    body: "Hey Robloxian!\n\nCongratulations! You've been selected to receive 10,000 FREE Robux!\n\nTo claim your Robux, log in to verify your account:\n\n→ Claim Free Robux\n\nThis offer expires in 2 hours. Don't miss out!\n\nRoblox Team",
    phishing: true,
    explanation: "Roblox never gives free Robux via email promotions. 'roblox-gift-promo.com' is not Roblox's domain. This scam specifically targets younger users.",
    hardReason: "", time: "4:00 PM", avatar: "RB", avatarColor: "#E2231A",
  },
  {
    id: 78, hard: false,
    sender: "noreply@duolingo.com", senderName: "Duolingo",
    subject: "You're on a 30-day streak! 🔥",
    preview: "Incredible work — you've practiced 30 days in a row.",
    body: "Wow, 30 days in a row!\n\nYou've been learning Spanish for 30 consecutive days. That's seriously impressive.\n\nKeep your streak going — open Duolingo to continue today's lesson.\n\nDuo and the Duolingo Team",
    phishing: false,
    explanation: "Legitimate Duolingo streak notification from @duolingo.com. It simply encourages you to open the app, contains no login links or credential requests.",
    hardReason: "", time: "8:00 AM", avatar: "DL", avatarColor: "#58CC02",
  },
  {
    id: 79, hard: false,
    sender: "offers@amazon-special-member.net", senderName: "Amazon Prime",
    subject: "Prime Day early access — 80% off electronics",
    preview: "Exclusive early access for Prime members. Deals end tonight.",
    body: "Dear Prime Member,\n\nToday only — 80% off on thousands of items!\n\nYour exclusive deals expire at midnight.\n\n→ Shop Prime Day Deals Now\n\nAmazon Prime Offers",
    phishing: true,
    explanation: "'amazon-special-member.net' is not Amazon's domain. Amazon Prime Day communications only come from @amazon.com. Extreme discounts and midnight deadlines are pressure tactics.",
    hardReason: "", time: "9:00 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 80, hard: false,
    sender: "no-reply@canva.com", senderName: "Canva",
    subject: "Emily shared a design with you",
    preview: "Emily Chen shared 'Marketing Deck — May 2026' with you.",
    body: "Hi,\n\nEmily Chen (emily.chen@acmecorp.com) shared a Canva design with you.\n\nDesign: Marketing Deck — May 2026\n\nView and collaborate on this design at canva.com.\n\nThe Canva Team",
    phishing: false,
    explanation: "Legitimate Canva share notification from @canva.com. It directs you to canva.com and contains no credential request.",
    hardReason: "", time: "10:45 AM", avatar: "CV", avatarColor: "#7D2AE8",
  },
  {
    id: 81, hard: false,
    sender: "alert@usps-delivery-notice.com", senderName: "USPS",
    subject: "Package #9400: Delivery attempted",
    preview: "Delivery attempted. Schedule redelivery or pick up at your post office.",
    body: "United States Postal Service\n\nDelivery attempted for package #9400111206206428285.\n\nWe tried to deliver your package but no one was available.\n\n→ Schedule Redelivery\n\nUSPS Customer Service",
    phishing: true,
    explanation: "'usps-delivery-notice.com' is not USPS's domain. The real USPS website is usps.com. The USPS never emails delivery notifications from third-party domains.",
    hardReason: "", time: "1:22 PM", avatar: "US", avatarColor: "#004B87",
  },
  {
    id: 82, hard: false,
    sender: "info@starbucks.com", senderName: "Starbucks Rewards",
    subject: "Your Stars are expiring soon",
    preview: "You have 150 Stars that expire on June 30. Redeem them before they're gone.",
    body: "Hi,\n\nYour Starbucks Rewards Stars are expiring soon.\n\nStars expiring: 150\nExpiration date: June 30, 2026\n\nUse your Stars to redeem free drinks and food. Open the Starbucks app to redeem.\n\nStarbucks Rewards",
    phishing: false,
    explanation: "Legitimate Starbucks Rewards notification from @starbucks.com. It directs you to the app to redeem and makes no credential request.",
    hardReason: "", time: "7:30 AM", avatar: "SB", avatarColor: "#00704A",
  },
  {
    id: 83, hard: true,
    sender: "noreply@salesforce.com", senderName: "Salesforce",
    subject: "Your Salesforce login from a new location",
    preview: "New login detected for your Salesforce account.",
    body: "Hi,\n\nWe detected a login to your Salesforce account from a new location.\n\nLocation: Denver, CO\nDevice: Chrome on MacOS\nTime: May 28, 2026 at 3:18 PM\n\nIf this was you, no action is required.\n\nIf this wasn't you, reset your password immediately at login.salesforce.com and contact your Salesforce administrator.\n\nSalesforce Security",
    phishing: false,
    explanation: "Legitimate Salesforce security alert from @salesforce.com. It directs you to login.salesforce.com (Salesforce's real login domain) and contains no embedded credential link.",
    hardReason: "Salesforce is a corporate tool; new-location login alerts are often used in targeted corporate phishing. This one is real.",
    time: "3:20 PM", avatar: "SF", avatarColor: "#00A1E0",
  },
  {
    id: 84, hard: true,
    sender: "security-alert@apple.com", senderName: "Apple",
    subject: "New device added to your Apple ID",
    preview: "A MacBook Pro was signed in to your Apple ID.",
    body: "Dear Customer,\n\nA MacBook Pro (13-inch, M2) was just signed in to your Apple ID.\n\nIf you recently set up a new device, this message is expected.\n\nIf you didn't sign in with a new device, go to appleid.apple.com to review your account and remove unknown devices.\n\nApple",
    phishing: false,
    explanation: "Legitimate Apple security notification from @apple.com. It directs you to appleid.apple.com and does not embed a direct login link within the email.",
    hardReason: "Alarming content about a device you may not recognize, from an official Apple domain. The format closely mirrors phishing versions of this exact email.",
    time: "7:01 PM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 85, hard: true,
    sender: "notifications@facebookmail.com", senderName: "Facebook",
    subject: "Your Facebook page has been scheduled for removal",
    preview: "Your page violates our policies. Appeal within 48 hours.",
    body: "Hi,\n\nYour Facebook Page has been scheduled for removal due to repeated violations of our Community Standards.\n\nIf you believe this is a mistake, you can appeal this decision through our review process:\n\n→ Appeal Page Removal\n\nYou have 48 hours to submit your appeal. After that, the removal will be final.\n\nMeta Support Team",
    phishing: true,
    explanation: "facebookmail.com is Facebook's real sending domain — but this email is still phishing. The appeal link leads to a fake Meta login page. Real Facebook page removal notices direct you to facebook.com/help/contact/.",
    hardReason: "Real sending domain, frightening content for page owners, and a time-limited appeal. Only the link destination reveals the scam.",
    time: "9:15 AM", avatar: "FB", avatarColor: "#1877f2",
  },
  {
    id: 86, hard: true,
    sender: "noreply@paypal.com", senderName: "PayPal",
    subject: "You've been approved for PayPal Credit",
    preview: "Congratulations! Your PayPal Credit application was approved.",
    body: "Hi,\n\nCongratulations — you've been approved for PayPal Credit.\n\nCredit line: $1,500.00\nAPR: 23.99% (variable)\n\nYour PayPal Credit account is now active. You can use it anywhere PayPal is accepted.\n\nReview your terms and manage your account at paypal.com/credit.\n\nPayPal Credit",
    phishing: false,
    explanation: "Legitimate PayPal Credit approval notification from @paypal.com. It directs you to paypal.com/credit and contains no credential request.",
    hardReason: "Unexpected large credit approval creates cognitive dissonance — users often assume unsolicited financial emails are scams, but this one is legitimate.",
    time: "2:00 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 87, hard: true,
    sender: "do-not-reply@netflix.com", senderName: "Netflix",
    subject: "New device signed in to your account",
    preview: "A new device signed in to Netflix. Was this you?",
    body: "Hi,\n\nA new device was used to sign in to your Netflix account.\n\nDevice type: Smart TV\nLocation: Austin, TX\nTime: May 28, 2026 at 8:04 PM\n\nIf this was you, you don't need to do anything.\n\nIf this wasn't you, change your password at netflix.com/account.\n\nNetflix",
    phishing: false,
    explanation: "Legitimate Netflix device sign-in notification from @netflix.com. It directs you to netflix.com/account and uses Netflix's standard security alert format.",
    hardReason: "Correct Netflix domain with a new Smart TV login — identical format to phishing versions. The key difference is no direct login link in the email body.",
    time: "8:06 PM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 88, hard: true,
    sender: "it@yourcompany.com", senderName: "IT Security Team",
    subject: "Mandatory: Complete cybersecurity training by Friday",
    preview: "All employees must complete the 2026 security awareness module.",
    body: "Hi,\n\nAs part of our annual security compliance program, all employees are required to complete the 2026 Cybersecurity Awareness Training by Friday, May 30.\n\nComplete your training here:\n→ Start Training Module\n\nCompletion takes approximately 20 minutes. Failure to complete training may result in temporary system access restrictions.\n\nIT Security Team",
    phishing: true,
    explanation: "This is a simulated phishing test — the exact type many corporate security teams deploy. The 'training link' actually tests whether employees click suspicious links. Always verify mandatory training links through your official company intranet or by calling IT directly.",
    hardReason: "Looks exactly like a real corporate IT security training request. The irony: clicking the 'security training' link is itself the phishing failure.",
    time: "8:00 AM", avatar: "IT", avatarColor: "#5f6368",
  },
  {
    id: 89, hard: false,
    sender: "noreply@support.microsoft.com", senderName: "Microsoft Support",
    subject: "Your OneDrive storage is 95% full",
    preview: "You're running out of OneDrive storage. Upgrade or manage your files.",
    body: "Hi,\n\nYour OneDrive storage is almost full.\n\nUsed: 4.8 GB of 5 GB (Free plan)\n\nUpgrade to Microsoft 365 for 1 TB of OneDrive storage, plus Word, Excel, and Outlook.\n\nManage your storage at onedrive.live.com/options/managestorage.\n\nMicrosoft OneDrive Team",
    phishing: false,
    explanation: "Legitimate Microsoft OneDrive storage alert from @support.microsoft.com. It directs you to onedrive.live.com (Microsoft's real OneDrive domain) and makes no credential request.",
    hardReason: "", time: "9:00 AM", avatar: "OD", avatarColor: "#0078D4",
  },
  {
    id: 90, hard: false,
    sender: "alert@bankofamerica-account-security.net", senderName: "Bank of America",
    subject: "Your debit card has been blocked",
    preview: "Suspicious transaction detected. Your debit card is temporarily blocked.",
    body: "Dear Customer,\n\nDue to suspicious activity, your Bank of America debit card has been temporarily blocked.\n\nSuspicious transaction: $1,200.00 — Unknown Online Merchant\n\nTo unblock your card, verify your identity immediately.\n\n→ Unblock My Card\n\nBank of America Security",
    phishing: true,
    explanation: "'bankofamerica-account-security.net' is a fake domain. All Bank of America emails come from @bankofamerica.com. The .net TLD and hyphenated suffix are clear warning signs.",
    hardReason: "", time: "6:30 AM", avatar: "BA", avatarColor: "#e31837",
  },
  {
    id: 91, hard: false,
    sender: "team@asana.com", senderName: "Asana",
    subject: "You have 5 overdue tasks",
    preview: "These tasks are past due: Q2 Report, Client Deck, API Review...",
    body: "Hi,\n\nYou have 5 tasks that are past their due dates.\n\nOverdue tasks:\n• Q2 Performance Report — Due May 25\n• Client Pitch Deck — Due May 26\n• API Documentation Review — Due May 27\n\nOpen Asana to update these tasks and keep your team on track.\n\nThe Asana Team",
    phishing: false,
    explanation: "Legitimate Asana task reminder from @asana.com. It directs you to the Asana app and matches Asana's standard overdue task notification format.",
    hardReason: "", time: "9:10 AM", avatar: "AS", avatarColor: "#F06A6A",
  },
  {
    id: 92, hard: false,
    sender: "no-reply@citibank-online-secure.com", senderName: "Citibank",
    subject: "Important security update for your Citi account",
    preview: "We've updated our security protocols. Verify your information.",
    body: "Dear Citi Cardmember,\n\nWe have updated our security protocols and need to verify your account information to ensure continued access.\n\nPlease verify your details within 48 hours to prevent service interruption.\n\n→ Verify My Account\n\nCitibank Security Team",
    phishing: true,
    explanation: "'citibank-online-secure.com' is a fake domain — Citibank emails come from @citi.com or @citibank.com. Banks never ask you to 're-verify' account information through an emailed link.",
    hardReason: "", time: "7:55 AM", avatar: "CI", avatarColor: "#003B70",
  },
  {
    id: 93, hard: false,
    sender: "hello@notion.so", senderName: "Notion",
    subject: "Your teammate invited you to a workspace",
    preview: "Alex Rivera invited you to join 'Startup Studio' on Notion.",
    body: "Hi,\n\nAlex Rivera invited you to join the Notion workspace 'Startup Studio'.\n\nThis workspace has 8 members.\n\nJoin the workspace at notion.so.\n\nThe Notion Team",
    phishing: false,
    explanation: "Legitimate Notion workspace invitation from @notion.so. It directs you to notion.so and contains no credential request.",
    hardReason: "", time: "10:12 AM", avatar: "NO", avatarColor: "#191919",
  },
  {
    id: 94, hard: false,
    sender: "security@paypa1-team.com", senderName: "PayPal",
    subject: "Funds on hold: verify your account",
    preview: "Your recent payment is on hold pending identity verification.",
    body: "Dear PayPal Member,\n\nA recent payment of $2,450.00 to an unverified account has been placed on hold.\n\nTo release this hold and verify your identity:\n\n→ Complete Verification\n\nThis hold will expire in 72 hours and the payment will be refunded unless you verify.\n\nPayPal Trust & Safety",
    phishing: true,
    explanation: "'paypa1-team.com' uses a number '1' instead of 'l'. PayPal's real domain is @paypal.com.",
    hardReason: "", time: "3:25 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 95, hard: false,
    sender: "noreply@shopify.com", senderName: "Shopify",
    subject: "Your store had 3 new orders today",
    preview: "You received 3 orders totaling $110.49 today.",
    body: "Hi,\n\nGreat news — your Shopify store received 3 new orders today!\n\nOrder #1001: Blue Ceramic Mug — $24.99\nOrder #1002: Linen Tote Bag — $38.00\nOrder #1003: Soy Candle Set — $47.50\n\nTotal today: $110.49\n\nView and fulfill these orders at admin.shopify.com.\n\nShopify",
    phishing: false,
    explanation: "Legitimate Shopify order notification from @shopify.com. It directs you to admin.shopify.com (Shopify's real admin portal) and asks for no credentials.",
    hardReason: "", time: "5:30 PM", avatar: "SH", avatarColor: "#96BF48",
  },
  {
    id: 96, hard: false,
    sender: "no-reply@crypto-wallet-secure.io", senderName: "Coinbase",
    subject: "Verify your Coinbase wallet — urgent",
    preview: "Your Coinbase wallet requires immediate verification.",
    body: "Dear Coinbase User,\n\nYour Coinbase wallet has been flagged for verification due to unusual activity.\n\nYou must verify your wallet seed phrase to prevent fund loss.\n\n→ Verify Wallet Now\n\nCoinbase Security",
    phishing: true,
    explanation: "Extreme red flag: asking for your 'wallet seed phrase' is ALWAYS a scam. No legitimate platform ever needs your seed phrase. The fake domain 'crypto-wallet-secure.io' adds further confirmation.",
    hardReason: "", time: "2:05 PM", avatar: "CB", avatarColor: "#0052FF",
  },
  {
    id: 97, hard: false,
    sender: "contact@calendly.com", senderName: "Calendly",
    subject: "New meeting booked: 30-min Product Demo",
    preview: "Marcus Wu booked a 30-minute Product Demo with you for June 2 at 2:00 PM.",
    body: "Hi,\n\nA new meeting has been scheduled.\n\nMeeting: 30-min Product Demo\nWith: Marcus Wu (m.wu@techventures.io)\nDate: June 2, 2026 at 2:00 PM EST\nLocation: Google Meet\n\nView or manage this event at calendly.com/events.\n\nCalendly",
    phishing: false,
    explanation: "Legitimate Calendly booking confirmation from @calendly.com. It contains real meeting details, directs you to calendly.com, and makes no credential request.",
    hardReason: "", time: "11:30 AM", avatar: "CA", avatarColor: "#006BFF",
  },
  {
    id: 98, hard: true,
    sender: "support@slack.com", senderName: "Slack",
    subject: "Your Slack workspace plan will be downgraded",
    preview: "Payment failed. Workspace will move to free plan on June 1.",
    body: "Hi,\n\nWe were unable to process the payment for your Slack Pro workspace 'Acme Corp'.\n\nUnless your payment method is updated, your workspace will be downgraded to the free plan on June 1, 2026. This means message history limited to 90 days, fewer app integrations, and no guest accounts.\n\nUpdate your billing at slack.com/billing.\n\nSlack",
    phishing: false,
    explanation: "Legitimate Slack billing failure notification from @slack.com. It directs you to slack.com/billing (Slack's real billing page) and does not include an embedded payment link.",
    hardReason: "Alarming content for workspace admins about losing functionality. Users under pressure may click phishing links in a real-looking Slack billing email.",
    time: "10:00 AM", avatar: "SL", avatarColor: "#4A154B",
  },
  {
    id: 99, hard: true,
    sender: "noreply@medium.com", senderName: "Medium",
    subject: "Your story was distributed to 4,200 readers",
    preview: "Great news — your story reached 4,200 people through the Medium distribution network.",
    body: "Hi,\n\nYour story 'The Quiet Case for Async Work' was distributed to 4,200 readers through Medium's distribution network.\n\nViews this week: 4,214\nReads: 1,887\nClaps: 312\n\nContinue writing and growing your audience at medium.com.\n\nThe Medium Team",
    phishing: false,
    explanation: "Legitimate Medium distribution notification from @medium.com. It directs you to medium.com and matches Medium's standard creator metrics email format.",
    hardReason: "Unexpected large distribution numbers could trick users into thinking it's a reward scam, but this email is genuine.",
    time: "9:00 AM", avatar: "MD", avatarColor: "#000000",
  },
  {
    id: 100, hard: true,
    sender: "automated@zendesk.com", senderName: "Zendesk",
    subject: "Support ticket #847291 has been resolved",
    preview: "Your support ticket was resolved by the support team.",
    body: "Hi,\n\nYour support ticket #847291 has been resolved.\n\nTicket: Password reset issues on mobile app\nResolved by: Support Agent (Lisa M.)\nResolution: Password reset email resent. Check your spam folder.\n\nIf the issue persists, reply to this email or visit support.zendesk.com.\n\nZendesk",
    phishing: false,
    explanation: "Legitimate Zendesk ticket resolution notice from @zendesk.com. It directs you to support.zendesk.com and requires no credential input.",
    hardReason: "A ticket resolution email referencing a password reset creates a confusing context — users who didn't open a ticket may think their account was accessed.",
    time: "1:15 PM", avatar: "ZD", avatarColor: "#03363D",
  },
  {
    id: 101, hard: false,
    sender: "no-reply@goog1e-docs-share.com", senderName: "Google Docs",
    subject: "Someone shared a document with you",
    preview: "Mark Harper shared 'Q3 Budget Review' with you.",
    body: "Mark Harper (m.harper@acmecorp.com) has shared a document with you.\n\nDocument: Q3 Budget Review\n\n→ Open in Google Docs\n\nGoogle Docs",
    phishing: true,
    explanation: "'goog1e-docs-share.com' replaces the letter 'l' with number '1'. Real Google Docs share notifications come from @google.com or @docs.google.com.",
    hardReason: "", time: "11:00 AM", avatar: "GD", avatarColor: "#4285f4",
  },
  {
    id: 102, hard: false,
    sender: "orders@doordash.com", senderName: "DoorDash",
    subject: "Your order from Shake Shack is on the way!",
    preview: "Carlos is heading to pick up your order. Estimated delivery: 28 min.",
    body: "Your order is confirmed!\n\nRestaurant: Shake Shack\nDasher: Carlos R.\nEstimated delivery: 7:42 PM\n\nOrder summary:\n• ShackBurger (no pickles)\n• Cheese Fries\n• Chocolate Shake\nTotal: $28.94\n\nTrack your order in the DoorDash app.\n\nDoorDash",
    phishing: false,
    explanation: "Legitimate DoorDash order confirmation from @doordash.com. It directs you to the DoorDash app for tracking and makes no credential requests.",
    hardReason: "", time: "7:14 PM", avatar: "DD", avatarColor: "#FF3008",
  },
  {
    id: 103, hard: false,
    sender: "accounts@googledrive-storage-full.com", senderName: "Google Drive",
    subject: "Your Google Drive is full — urgent",
    preview: "You've used all 15 GB of free Google storage. Files at risk.",
    body: "Dear Google User,\n\nYour Google Drive storage is completely full (15 GB / 15 GB).\n\nNew emails, photos, and documents are no longer being saved.\n\nUpgrade to Google One to get more storage.\n\n→ Upgrade Google Storage Now\n\nFailure to upgrade may result in loss of recent files.\n\nGoogle Storage Team",
    phishing: true,
    explanation: "'googledrive-storage-full.com' is not Google's domain. Google storage alerts come from @google.com. Google does not threaten file loss via email.",
    hardReason: "", time: "8:45 AM", avatar: "GD", avatarColor: "#4285f4",
  },
  {
    id: 104, hard: false,
    sender: "noreply@proton.me", senderName: "Proton Mail",
    subject: "Your Proton Mail storage is 80% full",
    preview: "Upgrade to increase your Proton storage or delete old emails.",
    body: "Hi,\n\nYour Proton Mail storage is 80% full (400 MB of 500 MB).\n\nWhen your storage is full, you will no longer be able to send or receive emails.\n\nUpgrade to Proton Mail Plus for 15 GB of storage, or manage your storage at mail.proton.me.\n\nThe Proton Team",
    phishing: false,
    explanation: "Legitimate Proton Mail storage notification from @proton.me (Proton's real domain). It directs you to mail.proton.me and makes no credential request.",
    hardReason: "", time: "10:30 AM", avatar: "PM", avatarColor: "#6D4AFF",
  },
  {
    id: 105, hard: false,
    sender: "hello@robinhood-invest-rewards.com", senderName: "Robinhood",
    subject: "You earned a free stock!",
    preview: "A referral reward is waiting. Claim your free share today.",
    body: "Congrats!\n\nYour free stock reward from a referral is waiting to be claimed.\n\nYour reward: 1 free share (value: up to $225)\n\nClaim it before it expires:\n\n→ Claim My Free Stock\n\nRobinhood Rewards Team",
    phishing: true,
    explanation: "'robinhood-invest-rewards.com' is not Robinhood's domain (@robinhood.com). Robinhood referral rewards are claimed through the app, not via external email links.",
    hardReason: "", time: "12:15 PM", avatar: "RH", avatarColor: "#00C805",
  },
  {
    id: 106, hard: false,
    sender: "noreply@coursera.org", senderName: "Coursera",
    subject: "Your certificate is ready to download",
    preview: "Congratulations on completing Machine Learning Specialization!",
    body: "Congratulations!\n\nYou've successfully completed the Machine Learning Specialization on Coursera.\n\nYour certificate is ready. Download it or add it to your LinkedIn profile at coursera.org/account/accomplishments.\n\nThe Coursera Team",
    phishing: false,
    explanation: "Legitimate Coursera completion certificate from @coursera.org. It directs you to coursera.org and makes no credential request.",
    hardReason: "", time: "11:45 AM", avatar: "CO", avatarColor: "#0056D2",
  },
  {
    id: 107, hard: false,
    sender: "contact@fedex-security-notice.net", senderName: "FedEx",
    subject: "URGENT: Your shipment requires immediate action",
    preview: "Your FedEx package contains restricted items. Verify immediately.",
    body: "Dear FedEx Customer,\n\nYour recent shipment has been intercepted by customs authorities due to undeclared restricted items.\n\nTo avoid legal penalties, you must verify your identity and provide documentation within 24 hours.\n\n→ Verify Identity Now\n\nFedEx Compliance Team",
    phishing: true,
    explanation: "'fedex-security-notice.net' is not FedEx's domain. This email uses fear of legal penalties and a fake customs intercept story. Real customs issues are handled through official government channels.",
    hardReason: "", time: "7:00 AM", avatar: "FX", avatarColor: "#4D148C",
  },
  {
    id: 108, hard: false,
    sender: "info@cloudflare.com", senderName: "Cloudflare",
    subject: "Your domain example.com is expiring in 30 days",
    preview: "Renew your domain before it expires and becomes available to others.",
    body: "Hi,\n\nYour domain example.com is expiring on June 28, 2026.\n\nRenew your domain to keep ownership and avoid downtime for your website and email.\n\nRenew at dash.cloudflare.com/domains.\n\nCloudflare",
    phishing: false,
    explanation: "Legitimate Cloudflare domain expiration notice from @cloudflare.com. It directs you to dash.cloudflare.com (Cloudflare's real dashboard) and makes no credential request.",
    hardReason: "", time: "8:00 AM", avatar: "CF", avatarColor: "#F48120",
  },
  {
    id: 109, hard: false,
    sender: "mailer@whatsapp-verif1cation.com", senderName: "WhatsApp",
    subject: "Your WhatsApp account verification code",
    preview: "Your WhatsApp verification code is 847-291. Do not share this.",
    body: "WhatsApp\n\nYour WhatsApp account is being verified from a new device.\n\nVerification code: 847-291\n\nDo not share this code with anyone.\n\nWhatsApp Team",
    phishing: true,
    explanation: "'whatsapp-verif1cation.com' uses a '1' instead of 'i'. WhatsApp verification codes are sent by SMS, not email. This is an account takeover attempt.",
    hardReason: "", time: "9:55 PM", avatar: "WA", avatarColor: "#25D366",
  },
  {
    id: 110, hard: false,
    sender: "noreply@stripe.com", senderName: "Stripe",
    subject: "New payout: $1,247.80 sent to your bank",
    preview: "A payout of $1,247.80 has been sent to your Chase Bank account.",
    body: "Hi,\n\nA new payout has been initiated from your Stripe account.\n\nAmount: $1,247.80\nDestination: Chase Bank (****4821)\nEstimated arrival: June 1–2, 2026\n\nView your payout details at dashboard.stripe.com/payouts.\n\nStripe",
    phishing: false,
    explanation: "Legitimate Stripe payout notification from @stripe.com. It directs you to dashboard.stripe.com (Stripe's real dashboard) and makes no credential request.",
    hardReason: "", time: "6:00 PM", avatar: "ST", avatarColor: "#635BFF",
  },
  {
    id: 111, hard: true,
    sender: "no-reply@mail.notion.so", senderName: "Notion",
    subject: "You were mentioned in a comment",
    preview: "Jake M. mentioned you: '@you can you review this section?'",
    body: "Hi,\n\nJake M. mentioned you in a comment on 'Product Spec — v2.1'.\n\nComment: '@you can you review this section before we share with stakeholders?'\n\nView the comment and respond at notion.so.\n\nThe Notion Team",
    phishing: false,
    explanation: "Legitimate Notion mention notification from @mail.notion.so, Notion's real notification subdomain. It directs you to notion.so and makes no credential request.",
    hardReason: "The subdomain mail.notion.so can seem suspicious, but it is Notion's real sending address for notifications.",
    time: "3:44 PM", avatar: "NO", avatarColor: "#191919",
  },
  {
    id: 112, hard: true,
    sender: "admin@company.com", senderName: "IT Admin",
    subject: "VPN client update required — action needed",
    preview: "Your VPN client is outdated. Download the update to maintain secure access.",
    body: "Hi,\n\nOur IT security team has identified that your VPN client is running an outdated version with a known vulnerability.\n\nPlease download and install the update before May 31 to maintain secure remote access:\n\n→ Download VPN Update (v4.2.1)\n\nIf you have any issues, contact IT at ext. 4400.\n\nIT Administration",
    phishing: true,
    explanation: "Legitimate VPN updates are pushed automatically by enterprise IT systems or downloaded from your company's official intranet — never via email links. Always verify with IT before downloading software from an emailed link.",
    hardReason: "Convincing corporate context with version numbers and an internal phone extension. The only tell is the download link in the email.",
    time: "8:30 AM", avatar: "IT", avatarColor: "#5f6368",
  },
  {
    id: 113, hard: true,
    sender: "noreply@github.com", senderName: "GitHub",
    subject: "Dependabot alert: critical vulnerability in lodash",
    preview: "A critical security vulnerability was found in a dependency of your repo.",
    body: "Hi,\n\nDependabot found a critical vulnerability in your repository.\n\nRepository: yourorg/yourapp\nPackage: lodash 4.17.15\nVulnerability: Prototype pollution (CVE-2019-10744)\nSeverity: Critical\n\nDependabot has opened a pull request to update lodash to 4.17.21. Review the PR at github.com/yourorg/yourapp/pull/312.\n\nGitHub Security",
    phishing: false,
    explanation: "Legitimate GitHub Dependabot security alert from @github.com. It provides a real CVE number, directs you to a specific GitHub PR URL, and makes no credential request.",
    hardReason: "Technical jargon and CVE numbers create authenticity. These exact alert formats are spoofed in targeted attacks against developers.",
    time: "6:25 AM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 114, hard: true,
    sender: "noreply@amazon.com", senderName: "Amazon",
    subject: "Return request approved: full refund processing",
    preview: "Your return for Sony WH-1000XM5 has been approved. Refund incoming.",
    body: "Hello,\n\nYour return request has been approved.\n\nItem: Sony WH-1000XM5 Headphones\nReturn reason: Defective\nRefund amount: $349.99\nRefund to: Visa ending in 4827\nProcessing time: 3–5 business days\n\nPrint your prepaid return label at amazon.com/returns.\n\nAmazon Customer Service",
    phishing: false,
    explanation: "Legitimate Amazon return approval from @amazon.com. It directs you to amazon.com/returns for the shipping label and contains no request for additional credentials.",
    hardReason: "Specific product and card details create high credibility. This exact format is used in phishing campaigns — the difference is the lack of a suspicious login link.",
    time: "4:48 PM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 115, hard: true,
    sender: "security@linkedin.com", senderName: "LinkedIn",
    subject: "Your LinkedIn account: unusual sign-in detected",
    preview: "We detected a sign-in to your LinkedIn account from São Paulo, Brazil.",
    body: "Hi,\n\nWe detected a sign-in to your LinkedIn account from an unrecognized location.\n\nLocation: São Paulo, Brazil\nDevice: Chrome on Windows\nTime: May 28, 2026 at 11:47 PM\n\nIf this was you, no action is needed. If this wasn't you, secure your account at linkedin.com/psettings/two-step-verification.\n\nLinkedIn Security Team",
    phishing: false,
    explanation: "Legitimate LinkedIn security alert from @linkedin.com. It directs you to linkedin.com/psettings and contains no embedded credential link.",
    hardReason: "Foreign location sign-in creates panic. LinkedIn's real alerts look identical to phishing versions — the URL in the email body is the key differentiator.",
    time: "11:49 PM", avatar: "LI", avatarColor: "#0a66c2",
  },
  {
    id: 116, hard: false,
    sender: "no-reply@amaz0n-prime-deals.com", senderName: "Amazon",
    subject: "Flash sale: 70% off today only",
    preview: "Your exclusive member deal expires at midnight.",
    body: "Hi Prime Member,\n\nToday only — 70% off on thousands of items!\n\nYour exclusive deals expire at midnight.\n\n→ Shop Flash Deals Now\n\nAmazon Prime",
    phishing: true,
    explanation: "'amaz0n-prime-deals.com' uses zero instead of 'o' in Amazon. All Amazon communications come from @amazon.com.",
    hardReason: "", time: "10:02 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 117, hard: false,
    sender: "notifications@github.com", senderName: "GitHub",
    subject: "New comment on issue #412",
    preview: "priya-k commented on 'Fix null pointer exception in auth module'.",
    body: "Hi,\n\npriya-k commented on issue #412 in yourorg/yourapp.\n\nComment: 'I think the bug is in the token refresh logic, not the auth check. Let me test with a fresh token.'\n\nView the issue at github.com/yourorg/yourapp/issues/412.\n\nGitHub",
    phishing: false,
    explanation: "Legitimate GitHub issue comment notification from @github.com. It directs you to a specific GitHub URL and asks for no credentials.",
    hardReason: "", time: "2:32 PM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 118, hard: false,
    sender: "support@paypa1-help-center.org", senderName: "PayPal Help",
    subject: "Your case #PP-2948-7291 has been opened",
    preview: "We received your dispute. A specialist will review it within 3 days.",
    body: "Dear Customer,\n\nYour dispute case #PP-2948-7291 has been opened and is under review.\n\nTo expedite resolution, please provide additional documentation:\n\n→ Upload Documents\n\nPayPal Help Center",
    phishing: true,
    explanation: "'paypa1-help-center.org' uses '1' instead of 'l'. PayPal emails come from @paypal.com. The .org TLD is unusual for a financial services company.",
    hardReason: "", time: "1:48 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 119, hard: false,
    sender: "noreply@mailchimp.com", senderName: "Mailchimp",
    subject: "Your campaign 'June Newsletter' was sent",
    preview: "Your email was sent to 1,243 subscribers.",
    body: "Hi,\n\nYour campaign 'June Newsletter' has been sent!\n\nRecipients: 1,243\nSent: May 28, 2026 at 10:00 AM\n\nTrack opens, clicks, and unsubscribes at mailchimp.com/reports.\n\nMailchimp",
    phishing: false,
    explanation: "Legitimate Mailchimp send confirmation from @mailchimp.com. It directs you to mailchimp.com for analytics and makes no credential request.",
    hardReason: "", time: "10:05 AM", avatar: "MC", avatarColor: "#FFE01B",
  },
  {
    id: 120, hard: false,
    sender: "alerts@chase-fraud-protection.net", senderName: "Chase",
    subject: "Fraud alert: transaction requires approval",
    preview: "A $2,499.00 transaction is pending your approval.",
    body: "Dear Chase Customer,\n\nA transaction of $2,499.00 has been flagged as potentially fraudulent and requires your immediate approval or denial.\n\nMerchant: Electronics Depot\nAmount: $2,499.00\n\n→ Approve Transaction\n→ Deny Transaction\n\nChase Fraud Protection",
    phishing: true,
    explanation: "'chase-fraud-protection.net' is a fake domain. Chase fraud alerts come from @chase.com. Real Chase fraud alerts come via text message or app notification, not email links.",
    hardReason: "", time: "5:12 PM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 121, hard: false,
    sender: "noreply@google.com", senderName: "Google Photos",
    subject: "Your storage summary — May 2026",
    preview: "You used 2.3 GB this month. Here's your Google account storage breakdown.",
    body: "Hi,\n\nHere's your Google account storage summary for May 2026.\n\nGoogle Drive: 7.2 GB\nGmail: 4.1 GB\nGoogle Photos: 3.2 GB\nTotal: 14.5 GB of 15 GB (free)\n\nManage your storage at one.google.com.\n\nGoogle",
    phishing: false,
    explanation: "Legitimate Google storage summary from @google.com. It directs you to one.google.com (Google's real storage management page) and requires no credential input.",
    hardReason: "", time: "9:01 AM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 122, hard: false,
    sender: "tax-return@irs-refund-gov.com", senderName: "IRS Refund",
    subject: "Tax refund of $1,204.00 pending your claim",
    preview: "You have an unclaimed IRS refund. Provide bank details to receive it.",
    body: "INTERNAL REVENUE SERVICE\n\nDear Taxpayer,\n\nAfter reviewing your 2025 tax return, you are entitled to a refund of $1,204.00.\n\nTo receive your refund via direct deposit, please provide your banking information:\n\n→ Enter Banking Information\n\nThis refund will be forfeited if not claimed within 30 days.\n\nIRS Refund Division",
    phishing: true,
    explanation: "The IRS never emails taxpayers to collect banking information. Refunds are issued automatically based on your filed return. The domain '.com' confirms this is not a government site.",
    hardReason: "", time: "10:14 AM", avatar: "IR", avatarColor: "#004B87",
  },
  {
    id: 123, hard: false,
    sender: "help@typeform.com", senderName: "Typeform",
    subject: "Maria Gomez submitted a response to your form",
    preview: "New response received: 'Customer Satisfaction Survey'.",
    body: "Hi,\n\nMaria Gomez submitted a new response to your form 'Customer Satisfaction Survey'.\n\nOverall rating: 5/5\nFavorite feature: Ease of use\n\nView all responses at typeform.com/forms.\n\nTypeform",
    phishing: false,
    explanation: "Legitimate Typeform form submission notification from @typeform.com. It directs you to typeform.com and makes no credential request.",
    hardReason: "", time: "2:55 PM", avatar: "TF", avatarColor: "#262627",
  },
  {
    id: 124, hard: false,
    sender: "support@netfIix-account.com", senderName: "Netflix",
    subject: "Complete your profile to keep watching",
    preview: "Additional verification needed to maintain your Netflix subscription.",
    body: "Dear Netflix Member,\n\nTo continue enjoying Netflix, we need you to complete a quick profile verification.\n\nThis takes less than 2 minutes.\n\n→ Complete Verification\n\nNetflix Team",
    phishing: true,
    explanation: "The domain 'netfIix-account.com' uses a capital 'I' instead of lowercase 'l' — a homograph attack. Netflix never requires 'profile verification' via email.",
    hardReason: "", time: "8:22 PM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 125, hard: false,
    sender: "noreply@heroku.com", senderName: "Heroku",
    subject: "Your app 'myapp' was successfully deployed",
    preview: "Deployment successful: myapp deployed to production.",
    body: "Hi,\n\nYour application 'myapp' was successfully deployed to Heroku.\n\nDeploy hash: a1b2c3d\nBranch: main\nTime: May 28, 2026 at 3:22 PM\n\nView your app at myapp.herokuapp.com.\n\nHeroku",
    phishing: false,
    explanation: "Legitimate Heroku deployment confirmation from @heroku.com. It directs you to your app's Heroku subdomain and contains no credential request.",
    hardReason: "", time: "3:24 PM", avatar: "HK", avatarColor: "#430098",
  },
  {
    id: 126, hard: true,
    sender: "noreply@accounts.google.com", senderName: "Google",
    subject: "Two-step verification was disabled on your account",
    preview: "Two-factor authentication was turned off on your Google account.",
    body: "Hi,\n\nTwo-step verification was recently disabled on your Google Account.\n\nDate: May 28, 2026 at 9:14 PM\n\nIf you made this change, no action is needed.\n\nIf you didn't disable two-step verification, your account may be compromised. Go to myaccount.google.com/security to re-enable it immediately.\n\nGoogle Security Team",
    phishing: false,
    explanation: "Legitimate Google security alert from @accounts.google.com. It directs you to myaccount.google.com and contains no embedded login link.",
    hardReason: "Extremely alarming content (2FA disabled) from a real subdomain. Users may assume it's phishing right when they need to act on it.",
    time: "9:16 PM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 127, hard: true,
    sender: "support@apple.com", senderName: "Apple",
    subject: "Your subscription: Apple TV+ renews tomorrow",
    preview: "Your Apple TV+ subscription renews tomorrow for $9.99.",
    body: "Dear Customer,\n\nYour Apple TV+ subscription renews tomorrow.\n\nPlan: Apple TV+\nRenewal amount: $9.99/month\n\nIf you'd like to cancel before renewal, visit subscriptions at appleid.apple.com.\n\nApple",
    phishing: false,
    explanation: "Legitimate Apple subscription renewal reminder from @apple.com. It directs you to appleid.apple.com and contains no request for payment information directly in the email.",
    hardReason: "Routine subscription emails from real domains are frequently cloned. Users who are unfamiliar with Apple's email style may over-flag this as phishing.",
    time: "11:00 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 128, hard: true,
    sender: "no-reply@box.com", senderName: "Box",
    subject: "Legal team shared a folder with you: NDA Files",
    preview: "Jordan Hale shared 'NDA Files — Q2 Vendor Agreements' with you.",
    body: "Hi,\n\nJordan Hale (j.hale@legalpartners.com) shared a folder with you on Box.\n\nFolder: NDA Files — Q2 Vendor Agreements\nContents: 14 documents\n\nAccess this folder at app.box.com.\n\nBox",
    phishing: false,
    explanation: "Legitimate Box file sharing notification from @box.com. It directs you to app.box.com (Box's real app domain) and contains no credential request.",
    hardReason: "Sensitive-sounding folder name ('NDA Files') from a corporate email address. This exact format is heavily imitated in targeted corporate phishing.",
    time: "2:10 PM", avatar: "BX", avatarColor: "#0061D5",
  },
  {
    id: 129, hard: true,
    sender: "mailer@twitter.com", senderName: "X (Twitter)",
    subject: "Your X Premium subscription is active",
    preview: "Thanks for subscribing to X Premium. Here's your receipt.",
    body: "Hi,\n\nYour X Premium subscription is now active.\n\nPlan: X Premium+\nMonthly charge: $16.00\nNext billing date: June 28, 2026\nPayment: Visa ending in 4821\n\nManage your subscription at x.com/settings/subscription.\n\nX",
    phishing: false,
    explanation: "Legitimate X (Twitter) subscription confirmation from @twitter.com (X's real sending domain). It directs you to x.com/settings and contains no credential request.",
    hardReason: "Unexpected $16 charge from an unfamiliar card creates urgency. Users may click a phishing link they believe is this email.",
    time: "12:01 AM", avatar: "X", avatarColor: "#000000",
  },
  {
    id: 130, hard: true,
    sender: "security@amazon.com", senderName: "Amazon",
    subject: "Sign-in attempt from an unrecognized device",
    preview: "A sign-in attempt to your Amazon account was detected.",
    body: "Hello,\n\nAn attempt was made to sign in to your Amazon account from an unrecognized device.\n\nDevice: Firefox on Linux\nLocation: Toronto, Canada\nDate: May 28, 2026 at 4:18 PM\n\nIf this was you, no action is needed.\n\nIf this wasn't you, visit amazon.com/account and change your password immediately.\n\nAmazon",
    phishing: false,
    explanation: "Legitimate Amazon security alert from @amazon.com. It directs you to amazon.com and does not include an embedded login link.",
    hardReason: "Correct domain, realistic device and location details, alarming content — nearly indistinguishable from phishing versions of this template.",
    time: "4:20 PM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 131, hard: false,
    sender: "alerts@bankofamerica.com", senderName: "Bank of America",
    subject: "Your eStatement is ready",
    preview: "Your May 2026 Bank of America statement is now available.",
    body: "Dear Customer,\n\nYour May 2026 statement is now available online.\n\nTo view your statement, sign in to Online Banking at bankofamerica.com.\n\nBank of America",
    phishing: false,
    explanation: "Legitimate Bank of America statement notification from @bankofamerica.com. It directs you to bankofamerica.com and contains no embedded login link.",
    hardReason: "", time: "8:05 AM", avatar: "BA", avatarColor: "#e31837",
  },
  {
    id: 132, hard: false,
    sender: "prize@microsoft-survey-rewards.com", senderName: "Microsoft",
    subject: "Complete a 2-minute survey — win a $500 gift card",
    preview: "Selected Microsoft user! Take our brief survey for a reward.",
    body: "Dear Microsoft User,\n\nYou have been selected to participate in a brief 2-minute customer satisfaction survey.\n\nAs a thank-you, you will receive a $500 Microsoft gift card upon completion.\n\n→ Start Survey\n\nThis offer is available to you only today.\n\nMicrosoft Research",
    phishing: true,
    explanation: "'microsoft-survey-rewards.com' is not Microsoft's domain. Microsoft does not offer $500 gift cards for surveys via unsolicited email.",
    hardReason: "", time: "9:30 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 133, hard: false,
    sender: "do-not-reply@invision.com", senderName: "InVision",
    subject: "Rachel T. commented on your prototype",
    preview: "New comment on 'Mobile App Checkout Flow v2'.",
    body: "Hi,\n\nRachel T. left a comment on your InVision prototype.\n\nPrototype: Mobile App Checkout Flow v2\nComment: 'The back button needs to be more prominent here. Can we test with a solid fill instead of outline?'\n\nView the comment at invisionapp.com.\n\nInVision",
    phishing: false,
    explanation: "Legitimate InVision comment notification from @invision.com. It directs you to invisionapp.com (InVision's real app domain) and makes no credential request.",
    hardReason: "", time: "3:00 PM", avatar: "IV", avatarColor: "#FF3366",
  },
  {
    id: 134, hard: false,
    sender: "no-reply@applestore-gift-cards.net", senderName: "Apple Store",
    subject: "Your gift card code: APPL-XXXX-XXXX-8421",
    preview: "Your Apple Store gift card is ready to use.",
    body: "Congratulations!\n\nYou have received an Apple Store gift card.\n\nCard value: $100\nCode: APPL-XXXX-XXXX-8421\n\nTo redeem this gift card, sign in to your Apple ID:\n\n→ Redeem Gift Card\n\nThis gift card expires in 7 days.\n\nApple Store",
    phishing: true,
    explanation: "'applestore-gift-cards.net' is not Apple's domain. Apple gift cards are redeemed directly in the App Store — never via emailed login links. The 7-day expiration creates false urgency.",
    hardReason: "", time: "6:45 PM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 135, hard: false,
    sender: "noreply@webex.com", senderName: "Webex",
    subject: "Recording available: All-Hands Q2 Review",
    preview: "The recording of 'All-Hands Q2 Review' is now available to watch.",
    body: "Hi,\n\nThe recording for 'All-Hands Q2 Review' is now available.\n\nMeeting date: May 28, 2026\nDuration: 1 hour 14 minutes\nHost: Jennifer Marsh\n\nWatch the recording at webex.com/recordings.\n\nWebex",
    phishing: false,
    explanation: "Legitimate Webex recording notification from @webex.com. It directs you to webex.com/recordings and makes no credential request.",
    hardReason: "", time: "12:30 PM", avatar: "WX", avatarColor: "#00BEF2",
  },
  {
    id: 136, hard: true,
    sender: "noreply@service.microsoft.com", senderName: "Microsoft",
    subject: "Unusual activity: sign-in from Vietnam",
    preview: "A sign-in to your Microsoft account was detected from Vietnam.",
    body: "Microsoft account\n\nUnusual sign-in blocked\n\nWe blocked a sign-in attempt to your Microsoft account from an unrecognized location.\n\nCountry: Vietnam\nDevice: Unknown Windows PC\nDate: May 28, 2026 at 2:22 AM\n\nIf this wasn't you, we recommend you review your account at account.microsoft.com.\n\nThe Microsoft account team",
    phishing: false,
    explanation: "Legitimate Microsoft security alert from @service.microsoft.com, a real Microsoft subdomain for account notifications. It directs you to account.microsoft.com.",
    hardReason: "The @service.microsoft.com subdomain is real but unfamiliar to many users who expect @microsoft.com.",
    time: "2:24 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 137, hard: true,
    sender: "no-reply@uber.com", senderName: "Uber",
    subject: "Security alert: your Uber password was changed",
    preview: "Your Uber account password was changed. Didn't do this? Act now.",
    body: "Hi,\n\nThe password for your Uber account was recently changed.\n\nIf you made this change, no action is needed.\n\nIf you didn't change your password, please secure your account immediately at auth.uber.com/reset-password.\n\nUber Security Team",
    phishing: false,
    explanation: "Legitimate Uber security notification from @uber.com. It directs you to auth.uber.com (Uber's real authentication domain) and contains no embedded login link.",
    hardReason: "Password changed notification creates urgent desire to click. Combined with an unfamiliar subdomain, users may dismiss it as phishing.",
    time: "11:02 PM", avatar: "UB", avatarColor: "#000000",
  },
  {
    id: 138, hard: true,
    sender: "docusign@docusign.net", senderName: "DocuSign",
    subject: "Complete signing: Merger Term Sheet",
    preview: "David Chen (CFO, Apex Capital) has sent you a merger term sheet to sign.",
    body: "David Chen (d.chen@apexcapital.com) has sent you a DocuSign document.\n\nDOCUMENT: Merger Term Sheet — Confidential\nDEADLINE: Sign by May 30\n\nThis document is highly confidential. Please do not share or forward.\n\n→ REVIEW AND SIGN IMMEDIATELY\n\nDocuSign, Inc. | 221 Main Street | San Francisco, CA 94105",
    phishing: true,
    explanation: "Real DocuSign domain, but the document contains a link to a credential-harvesting page — a 'living off trusted infrastructure' attack. Always verify M&A documents directly with your legal team before signing anything via email.",
    hardReason: "Real DocuSign infrastructure, high-stakes M&A context, and a confidentiality clause that discourages you from verifying with others.",
    time: "9:55 PM", avatar: "DS", avatarColor: "#FFCC00",
  },
  {
    id: 139, hard: false,
    sender: "noreply@payoneer.com", senderName: "Payoneer",
    subject: "Payment received: $1,500.00 from XYZ Agency",
    preview: "You received a payment of $1,500.00.",
    body: "Hi,\n\nYou received a payment.\n\nFrom: XYZ Agency\nAmount: $1,500.00 USD\nDate: May 28, 2026\n\nThe funds are now available in your Payoneer account. Withdraw to your bank at payoneer.com/account.\n\nPayoneer",
    phishing: false,
    explanation: "Legitimate Payoneer payment notification from @payoneer.com. It directs you to payoneer.com and makes no request for credentials.",
    hardReason: "", time: "3:10 PM", avatar: "PO", avatarColor: "#FF4800",
  },
  {
    id: 140, hard: false,
    sender: "support@appleid-locked-verify.com", senderName: "Apple",
    subject: "Your Apple ID is locked",
    preview: "Too many failed attempts. Unlock your Apple ID now.",
    body: "Dear Apple User,\n\nYour Apple ID has been locked due to too many failed sign-in attempts.\n\nUnlock your account immediately to avoid losing access to iCloud, App Store, and Apple Music.\n\n→ Unlock Apple ID\n\nApple Support",
    phishing: true,
    explanation: "'appleid-locked-verify.com' is a fake domain. Apple ID management only happens at appleid.apple.com — never on third-party domains.",
    hardReason: "", time: "7:08 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 141, hard: false,
    sender: "team@airtable.com", senderName: "Airtable",
    subject: "Jamie shared a base with you: Editorial Calendar",
    preview: "Jamie Liu shared 'Editorial Calendar 2026' with you on Airtable.",
    body: "Hi,\n\nJamie Liu (jamie.liu@contentco.com) shared an Airtable base with you.\n\nBase: Editorial Calendar 2026\n\nView and collaborate on this base at airtable.com.\n\nAirtable",
    phishing: false,
    explanation: "Legitimate Airtable share notification from @airtable.com. It directs you to airtable.com and makes no credential request.",
    hardReason: "", time: "9:48 AM", avatar: "AT", avatarColor: "#2D7FF9",
  },
  {
    id: 142, hard: false,
    sender: "billing@chase-account-secure.com", senderName: "Chase",
    subject: "Your credit card payment is overdue",
    preview: "Your Chase Sapphire payment of $1,347.22 is 15 days overdue.",
    body: "Dear Chase Cardmember,\n\nYour Chase Sapphire credit card payment is now 15 days past due.\n\nAmount due: $1,347.22\nDue date: May 13, 2026\n\nMake a payment immediately to avoid additional late fees and damage to your credit score.\n\n→ Pay Now\n\nChase Card Services",
    phishing: true,
    explanation: "'chase-account-secure.com' is not Chase's domain. All Chase communications come from @chase.com. Fear of credit damage is a pressure tactic commonly used in bank phishing.",
    hardReason: "", time: "11:55 AM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 143, hard: false,
    sender: "noreply@loom.com", senderName: "Loom",
    subject: "Chris M. shared a video with you",
    preview: "Chris M. sent you a Loom video: 'Product Update Walkthrough'.",
    body: "Hi,\n\nChris M. sent you a Loom video.\n\nVideo: Product Update Walkthrough\nLength: 4:23\n\nWatch the video at loom.com.\n\nLoom",
    phishing: false,
    explanation: "Legitimate Loom video share notification from @loom.com. It directs you to loom.com and makes no credential request.",
    hardReason: "", time: "10:17 AM", avatar: "LO", avatarColor: "#625DF5",
  },
  {
    id: 144, hard: false,
    sender: "account-alert@paypal-secure-verify.co", senderName: "PayPal",
    subject: "Unusual login — your account may be compromised",
    preview: "We detected a login from an unknown device. Secure your account now.",
    body: "Dear PayPal Member,\n\nWe detected a login to your account from an unknown device in a foreign country.\n\nFor your security, your account has been temporarily suspended.\n\nClick below to secure your account and restore access.\n\n→ Secure My Account\n\nPayPal Security",
    phishing: true,
    explanation: "'paypal-secure-verify.co' is not PayPal's domain. The .co TLD with hyphenated brand name is a classic phishing setup. PayPal emails only come from @paypal.com.",
    hardReason: "", time: "1:34 AM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 145, hard: true,
    sender: "noreply@zoom.us", senderName: "Zoom",
    subject: "Zoom Webinar: Registration Confirmed",
    preview: "You're registered for 'AI in Enterprise 2026' — June 5 at 2:00 PM.",
    body: "Hi,\n\nYou're registered for the following Zoom Webinar.\n\nWebinar: AI in Enterprise 2026\nDate: June 5, 2026 at 2:00 PM EST\nHost: TechConf Global\n\nJoin the webinar using your unique link:\nhttps://zoom.us/w/98247192847\n\nZoom",
    phishing: false,
    explanation: "Legitimate Zoom webinar registration from @zoom.us. The link uses zoom.us with a real webinar path format, and the email makes no credential request.",
    hardReason: "Webinar links are heavily abused in phishing. Users who don't remember registering may assume it's phishing, but the email itself is clean.",
    time: "10:00 AM", avatar: "ZM", avatarColor: "#2D8CFF",
  },
  {
    id: 146, hard: true,
    sender: "info@plaid.com", senderName: "Plaid",
    subject: "Chase Bank has been connected to your app",
    preview: "Chase Bank was linked through Plaid to an application.",
    body: "Hi,\n\nYour Chase Bank account was just connected through Plaid to an application.\n\nApp name: FinanceTrack Pro\nDate: May 28, 2026 at 6:44 PM\n\nIf you authorized this connection, no action is needed.\n\nIf you didn't authorize this connection, disconnect it immediately at my.plaid.com/connections.\n\nPlaid",
    phishing: false,
    explanation: "Legitimate Plaid bank connection notification from @plaid.com. Plaid is the real infrastructure many fintech apps use to connect bank accounts. It directs you to my.plaid.com.",
    hardReason: "Many users don't know what Plaid is, making this email seem suspicious. But Plaid is the real company behind bank connections in thousands of apps.",
    time: "6:46 PM", avatar: "PL", avatarColor: "#0A2540",
  },
  {
    id: 147, hard: false,
    sender: "account@g00gle-drive-alerts.com", senderName: "Google Drive",
    subject: "File shared with you: 2026 Financial Projections",
    preview: "Sarah Wong shared a confidential file with you.",
    body: "Sarah Wong (s.wong@financegroup.com) shared a file with you.\n\nFile: 2026 Financial Projections — CONFIDENTIAL\n\n→ Open in Google Drive\n\nGoogle Drive Team",
    phishing: true,
    explanation: "'g00gle-drive-alerts.com' uses two zeros instead of 'oo'. Real Google Drive share notifications come from @google.com.",
    hardReason: "", time: "2:48 PM", avatar: "GD", avatarColor: "#4285f4",
  },
  {
    id: 148, hard: false,
    sender: "noreply@atlassian.com", senderName: "Atlassian",
    subject: "You have been added to project PROJ-2026",
    preview: "You were added to the Jira project 'Mobile App Redesign'.",
    body: "Hi,\n\nYou've been added to the Jira project 'Mobile App Redesign (PROJ-2026)' by Aisha Rahman.\n\nYou can now view and create issues in this project at jira.atlassian.com.\n\nAtlassian",
    phishing: false,
    explanation: "Legitimate Atlassian Jira project notification from @atlassian.com. It directs you to jira.atlassian.com and makes no credential request.",
    hardReason: "", time: "9:00 AM", avatar: "JI", avatarColor: "#0052CC",
  },
  {
    id: 149, hard: false,
    sender: "billing@your-subscription-expired.com", senderName: "Adobe",
    subject: "Your Adobe Creative Cloud subscription has ended",
    preview: "Your Creative Cloud access has been removed. Renew now.",
    body: "Dear Customer,\n\nYour Adobe Creative Cloud subscription has ended. You no longer have access to Photoshop, Illustrator, or any other Creative Cloud apps.\n\nRenew your subscription to restore access.\n\n→ Renew Creative Cloud\n\nAdobe Customer Support",
    phishing: true,
    explanation: "'your-subscription-expired.com' is not Adobe's domain. Adobe subscription emails come from @adobe.com. This generic domain is designed to work against many subscription services.",
    hardReason: "", time: "8:15 AM", avatar: "AD", avatarColor: "#FA0F00",
  },
  {
    id: 150, hard: true,
    sender: "automated-notifications@linkedin.com", senderName: "LinkedIn",
    subject: "Your LinkedIn account: password changed successfully",
    preview: "Your LinkedIn password was changed.",
    body: "Hi,\n\nThe password for your LinkedIn account was changed on May 28, 2026.\n\nIf you made this change, no action is needed.\n\nIf you didn't make this change, go to linkedin.com/psettings/two-step-verification to secure your account immediately.\n\nLinkedIn Security",
    phishing: false,
    explanation: "Legitimate LinkedIn password change notification from @linkedin.com. It directs you to linkedin.com and makes no credential request.",
    hardReason: "Password change alerts are common phishing vectors. This is a real LinkedIn notification — the absence of an embedded 'click here to reverse this' link is the key distinction.",
    time: "8:02 PM", avatar: "LI", avatarColor: "#0a66c2",
  },
  {
    id: 151, hard: false,
    sender: "no-reply@app1e-verification.com", senderName: "Apple",
    subject: "Your iCloud account sign-in was blocked",
    preview: "We blocked a suspicious sign-in attempt to your iCloud account.",
    body: "Dear Apple Customer,\n\nWe blocked a suspicious sign-in attempt to your iCloud account.\n\nTo protect your account, we've temporarily suspended access.\n\nReactivate your account within 24 hours:\n\n→ Reactivate iCloud\n\nApple Security",
    phishing: true,
    explanation: "'app1e-verification.com' uses '1' instead of 'l'. Apple communications come from @apple.com. Apple does not 'suspend' iCloud via unsolicited email.",
    hardReason: "", time: "3:58 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 152, hard: false,
    sender: "noreply@squarespace.com", senderName: "Squarespace",
    subject: "Your website was published",
    preview: "Your Squarespace website 'myportfolio.squarespace.com' is now live.",
    body: "Hi,\n\nCongratulations — your website is live!\n\nYour site: myportfolio.squarespace.com\n\nYou can manage your site and view analytics at squarespace.com/account.\n\nSquarespace",
    phishing: false,
    explanation: "Legitimate Squarespace website launch notification from @squarespace.com. It directs you to squarespace.com/account and makes no credential request.",
    hardReason: "", time: "2:00 PM", avatar: "SS", avatarColor: "#000000",
  },
  {
    id: 153, hard: false,
    sender: "updates@netfIix-billing-team.com", senderName: "Netflix",
    subject: "Your payment method needs updating",
    preview: "We couldn't charge your card. Update to keep watching.",
    body: "Dear Netflix Member,\n\nYour payment method has expired.\n\nTo keep your subscription active, please update your payment method within 24 hours.\n\n→ Update Payment Method\n\nNetflix",
    phishing: true,
    explanation: "'netfIix-billing-team.com' uses a capital 'I' to mimic a lowercase 'l'. Netflix only sends emails from @netflix.com.",
    hardReason: "", time: "6:00 PM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 154, hard: false,
    sender: "no-reply@brex.com", senderName: "Brex",
    subject: "Card transaction: $2,847.00 at AWS Marketplace",
    preview: "A transaction was made on your Brex card.",
    body: "Hi,\n\nA transaction was made on your Brex card.\n\nAmount: $2,847.00\nMerchant: AWS Marketplace\nDate: May 28, 2026\nCard: Brex Card ending in 7294\n\nView your transactions at dashboard.brex.com.\n\nBrex",
    phishing: false,
    explanation: "Legitimate Brex card transaction notification from @brex.com. It directs you to dashboard.brex.com (Brex's real dashboard) and makes no credential request.",
    hardReason: "", time: "4:12 PM", avatar: "BR", avatarColor: "#FF6240",
  },
  {
    id: 155, hard: true,
    sender: "notifications@service.github.com", senderName: "GitHub",
    subject: "GitHub Actions workflow failed",
    preview: "[yourorg/yourapp] Build failed on main — deploy-production.yml",
    body: "Hi,\n\nThe workflow 'deploy-production.yml' failed in your repository yourorg/yourapp.\n\nBranch: main\nCommit: abc1234 'Update API rate limiting'\nJob: Deploy to Production\nError: Docker build failed — exceeded memory limit\n\nView the workflow run at github.com/yourorg/yourapp/actions/runs/84920192.\n\nGitHub Actions",
    phishing: false,
    explanation: "Legitimate GitHub Actions failure notification from @service.github.com, GitHub's real notification subdomain. It provides a real workflow run URL at github.com and makes no credential request.",
    hardReason: "Technical content with a specific commit hash and error message. GitHub Actions failures are a common social engineering vector for developer targeting.",
    time: "11:44 PM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 156, hard: false,
    sender: "noreply@microsoft-login-secure.net", senderName: "Microsoft",
    subject: "Sign-in verification code: 482917",
    preview: "Use this code to complete your Microsoft sign-in.",
    body: "Microsoft account\n\nYour one-time verification code:\n\n482917\n\nThis code expires in 10 minutes. If you did not attempt to sign in, please secure your account at account.microsoft.com.\n\nMicrosoft",
    phishing: true,
    explanation: "'microsoft-login-secure.net' is not Microsoft's domain. Microsoft OTP emails come from @microsoft.com. If you're receiving a code you didn't request, it means an attacker is attempting to log in to your account on a real Microsoft site.",
    hardReason: "", time: "10:53 PM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 157, hard: false,
    sender: "noreply@linear.app", senderName: "Linear",
    subject: "James Lee assigned an issue to you",
    preview: "Issue LIN-4821: 'Fix onboarding flow edge case' assigned to you.",
    body: "Hi,\n\nJames Lee assigned an issue to you.\n\nIssue: LIN-4821 — Fix onboarding flow edge case\nPriority: High\nDue: May 31, 2026\n\nView and update this issue at linear.app.\n\nLinear",
    phishing: false,
    explanation: "Legitimate Linear issue assignment notification from @linear.app. It directs you to linear.app and makes no credential request.",
    hardReason: "", time: "10:14 AM", avatar: "LN", avatarColor: "#5E6AD2",
  },
  {
    id: 158, hard: false,
    sender: "prizes@starbucks-loyalty-win.net", senderName: "Starbucks",
    subject: "You won 2 free Starbucks drinks!",
    preview: "Congratulations! Claim your 2 free drinks before they expire.",
    body: "Hi Starbucks Rewards Member,\n\nYou've been selected to receive 2 FREE drinks — any size!\n\nClaim your free drinks before they expire at midnight:\n\n→ Claim Free Drinks\n\nStarbucks Rewards Team",
    phishing: true,
    explanation: "'starbucks-loyalty-win.net' is not Starbucks's domain. Free drink offers are redeemed through the Starbucks app, never via external email links.",
    hardReason: "", time: "11:30 AM", avatar: "SB", avatarColor: "#00704A",
  },
  {
    id: 159, hard: true,
    sender: "billing@anthropic.com", senderName: "Anthropic",
    subject: "Invoice for Claude Pro — June 2026",
    preview: "Your monthly invoice of $20.00 for Claude Pro is ready.",
    body: "Hi,\n\nYour monthly invoice for Claude Pro is ready.\n\nPlan: Claude Pro\nAmount: $20.00\nBilling period: June 1–30, 2026\nCard: Visa ending in 4821\n\nView your invoice and manage your subscription at claude.ai/account.\n\nAnthropic",
    phishing: false,
    explanation: "Legitimate Anthropic billing notification from @anthropic.com. It directs you to claude.ai/account (Claude's real settings page) and makes no request for payment details directly in the email.",
    hardReason: "Anthropic is a newer brand, so users may not recognize @anthropic.com as legitimate. The $20 amount and specific card detail match Claude Pro's real pricing.",
    time: "1:00 AM", avatar: "AN", avatarColor: "#D97757",
  },
  {
    id: 160, hard: false,
    sender: "receipts@venmo.com", senderName: "Venmo",
    subject: "You paid Marcus $45 for dinner",
    preview: "Your Venmo payment to Marcus G. has been confirmed.",
    body: "Hi,\n\nYour payment was sent.\n\nTo: Marcus G.\nAmount: $45.00\nNote: Dinner — Italian place\nDate: May 28, 2026\n\nView your transaction history at venmo.com.\n\nVenmo",
    phishing: false,
    explanation: "Legitimate Venmo payment confirmation from @venmo.com. It directs you to venmo.com and makes no credential request.",
    hardReason: "", time: "8:49 PM", avatar: "VM", avatarColor: "#3D95CE",
  },
  {
    id: 161, hard: false,
    sender: "admin@wellsfarg0-online.com", senderName: "Wells Fargo",
    subject: "Action required: verify your identity",
    preview: "Your account access will be restricted unless you verify.",
    body: "Dear Wells Fargo Customer,\n\nWe need you to verify your identity to maintain full access to your account.\n\nPlease complete verification within 48 hours.\n\n→ Verify Identity\n\nWells Fargo",
    phishing: true,
    explanation: "'wellsfarg0-online.com' uses a zero instead of 'o' in Fargo. Wells Fargo emails come from @wellsfargo.com.",
    hardReason: "", time: "9:18 AM", avatar: "WF", avatarColor: "#D71E28",
  },
  {
    id: 162, hard: false,
    sender: "updates@vercel.com", senderName: "Vercel",
    subject: "Deployment successful: yourapp.vercel.app",
    preview: "Your latest deployment to production was successful.",
    body: "Hi,\n\nYour deployment was successful.\n\nProject: yourapp\nBranch: main\nCommit: 7f3a2b1 'Update landing page copy'\nDomain: yourapp.vercel.app\n\nView your deployment at vercel.com/dashboard.\n\nVercel",
    phishing: false,
    explanation: "Legitimate Vercel deployment notification from @vercel.com. It directs you to vercel.com/dashboard and makes no credential request.",
    hardReason: "", time: "5:15 PM", avatar: "VC", avatarColor: "#000000",
  },
  {
    id: 163, hard: false,
    sender: "service@amaz0n-prime-cancel.com", senderName: "Amazon",
    subject: "Your Prime membership has been cancelled",
    preview: "Sorry to see you go. Your Prime membership was cancelled.",
    body: "Hello,\n\nYour Amazon Prime membership has been cancelled.\n\nIf you did not cancel, click below to restore your membership:\n\n→ Restore Prime Membership\n\nAmazon Prime",
    phishing: true,
    explanation: "'amaz0n-prime-cancel.com' uses zero instead of 'o'. Amazon Prime emails come from @amazon.com. The 'didn't cancel?' CTA is designed to create panic.",
    hardReason: "", time: "10:22 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 164, hard: true,
    sender: "security@ebay.com", senderName: "eBay",
    subject: "Your eBay account: new login from unfamiliar device",
    preview: "A new sign-in to your eBay account was detected.",
    body: "Hi,\n\nA new sign-in to your eBay account was detected.\n\nDevice: Android Phone\nLocation: London, United Kingdom\nDate: May 28, 2026 at 5:30 PM\n\nIf this was you, no action is needed. If this wasn't you, secure your account at ebay.com/myebay/security.\n\neBay Security Team",
    phishing: false,
    explanation: "Legitimate eBay security notification from @ebay.com. It directs you to ebay.com/myebay/security and contains no embedded login link.",
    hardReason: "New sign-in from the UK — alarming for US users. eBay phishing is common; this real notification is easily dismissed as fake.",
    time: "5:32 PM", avatar: "EB", avatarColor: "#E53238",
  },
  {
    id: 165, hard: false,
    sender: "alerts@citi-bank-online-secure.net", senderName: "Citibank",
    subject: "Security notice: new payee added to your account",
    preview: "A new payee was added to your Citi online banking profile.",
    body: "Dear Citi Customer,\n\nA new payee has been added to your Citi online banking account.\n\nPayee name: John D.\nAmount limit: $5,000.00\n\nIf you did not add this payee, please contact us immediately.\n\n→ Secure My Account\n\nCitibank Security",
    phishing: true,
    explanation: "'citi-bank-online-secure.net' is not Citi's domain. Citibank emails come from @citi.com or @citibank.com.",
    hardReason: "", time: "2:27 AM", avatar: "CI", avatarColor: "#003B70",
  },
  {
    id: 166, hard: false,
    sender: "no-reply@figma.com", senderName: "Figma",
    subject: "Your Figma trial ends in 3 days",
    preview: "Your 30-day Figma Professional trial expires on June 1. Upgrade to keep access.",
    body: "Hi,\n\nYour Figma Professional trial ends on June 1, 2026.\n\nUpgrade to Figma Professional to keep access to premium templates, advanced prototyping, and brand kits.\n\nManage your plan at figma.com/account.\n\nFigma",
    phishing: false,
    explanation: "Legitimate Figma trial expiration notice from @figma.com. It directs you to figma.com/account and makes no credential request.",
    hardReason: "", time: "9:00 AM", avatar: "FG", avatarColor: "#F24E1E",
  },
  {
    id: 167, hard: true,
    sender: "alerts@ally.com", senderName: "Ally Bank",
    subject: "Large transfer initiated from your Ally account",
    preview: "A transfer of $15,000 to an external account has been initiated.",
    body: "Hi,\n\nA transfer has been initiated from your Ally Online Savings Account.\n\nAmount: $15,000.00\nDestination: External bank account (****8742)\nDate: May 28, 2026 at 11:22 PM\n\nIf you authorized this transfer, it will be processed within 1 business day.\n\nIf you did NOT authorize this transfer, contact Ally immediately at 1-877-247-2559 or visit ally.com.\n\nAlly Bank",
    phishing: false,
    explanation: "Legitimate Ally Bank transaction alert from @ally.com. It provides a real customer service number and directs you to ally.com. Ally does send these large-transfer alerts automatically.",
    hardReason: "A $15,000 transfer you didn't authorize creates extreme panic. The phone number and real domain are the signals this email is legitimate.",
    time: "11:24 PM", avatar: "AL", avatarColor: "#7D2248",
  },
  {
    id: 168, hard: false,
    sender: "support@paypa1-complaint.com", senderName: "PayPal",
    subject: "A complaint has been filed against you",
    preview: "A buyer filed a complaint on your transaction. Respond within 7 days.",
    body: "Dear PayPal Seller,\n\nA buyer has filed a complaint against a transaction in your PayPal account.\n\nComplaint: Item not received\nAmount: $299.00\n\nRespond to the complaint within 7 days or the case will be decided in the buyer's favor.\n\n→ Respond to Complaint\n\nPayPal",
    phishing: true,
    explanation: "'paypa1-complaint.com' uses a number '1' instead of 'l'. PayPal emails come from @paypal.com.",
    hardReason: "", time: "12:12 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 169, hard: false,
    sender: "noreply@twilio.com", senderName: "Twilio",
    subject: "Your Twilio account: billing alert",
    preview: "Your Twilio account balance is below $10. Add funds to avoid service interruption.",
    body: "Hi,\n\nYour Twilio account balance has dropped below $10.00.\n\nCurrent balance: $4.27\n\nAdd credits to your account to avoid SMS and call service interruptions.\n\nManage your billing at console.twilio.com.\n\nTwilio",
    phishing: false,
    explanation: "Legitimate Twilio billing alert from @twilio.com. It directs you to console.twilio.com (Twilio's real console) and makes no credential request.",
    hardReason: "", time: "2:00 PM", avatar: "TW", avatarColor: "#F22F46",
  },
  {
    id: 170, hard: true,
    sender: "member-services@costco.com", senderName: "Costco",
    subject: "Your Costco membership is expiring",
    preview: "Your Costco Gold Star membership expires on June 1. Renew online.",
    body: "Dear Costco Member,\n\nYour Costco Gold Star membership is expiring on June 1, 2026.\n\nRenew your membership online to continue enjoying Costco warehouse access and exclusive member savings.\n\nRenew at costco.com/membership.\n\nCostco",
    phishing: false,
    explanation: "Legitimate Costco membership renewal notice from @costco.com. It directs you to costco.com/membership and makes no credential request.",
    hardReason: "Membership expiration emails are a very common phishing template. This one is real, but users who don't shop at Costco may over-flag it.",
    time: "8:00 AM", avatar: "CC", avatarColor: "#005DAA",
  },
  {
    id: 171, hard: false,
    sender: "no-reply@chase-secure-account.net", senderName: "Chase",
    subject: "Your Chase account password was changed",
    preview: "Your Chase password was updated from a new device.",
    body: "Dear Chase Customer,\n\nYour Chase online account password was recently changed from a new device.\n\nIf you made this change, no further action is required.\n\nIf you did not change your password, click below to restore access immediately:\n\n→ Restore Account Access\n\nChase Security",
    phishing: true,
    explanation: "'chase-secure-account.net' is not Chase's domain. Chase emails come from @chase.com. The 'didn't do this?' CTA is designed to panic users into clicking.",
    hardReason: "", time: "3:33 AM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 172, hard: false,
    sender: "hello@intercom.io", senderName: "Intercom",
    subject: "New message from a user on your site",
    preview: "A visitor on your website sent a message through Intercom.",
    body: "Hi,\n\nA user sent a message through your Intercom chat widget.\n\nFrom: Visitor #48291\nMessage: 'Hi, I'm having trouble completing checkout. The promo code isn't working.'\n\nReply to this message at app.intercom.com/inbox.\n\nIntercom",
    phishing: false,
    explanation: "Legitimate Intercom customer message notification from @intercom.io. It directs you to app.intercom.com and makes no credential request.",
    hardReason: "", time: "4:22 PM", avatar: "IC", avatarColor: "#286EFA",
  },
  {
    id: 173, hard: false,
    sender: "offers@amaz0n-prime-credit.com", senderName: "Amazon",
    subject: "You're pre-approved for Amazon Prime Credit Card",
    preview: "Exclusive pre-approval offer for Prime members. 0% APR for 12 months.",
    body: "Dear Prime Member,\n\nCongratulations — you've been pre-approved for the Amazon Prime Rewards Visa Signature Card!\n\n• $200 Amazon gift card upon approval\n• 5% back on Amazon.com purchases\n• 0% APR for 12 months\n\n→ Accept Pre-Approval\n\nAmazon Financial Services",
    phishing: true,
    explanation: "'amaz0n-prime-credit.com' uses zero instead of 'o'. Pre-approval credit card offers come from Chase (Amazon's real bank partner), never from a fake Amazon domain.",
    hardReason: "", time: "10:01 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 174, hard: false,
    sender: "no-reply@discord.com", senderName: "Discord",
    subject: "Verify your email address",
    preview: "Verify your email to complete your Discord account setup.",
    body: "Hi,\n\nPlease verify your email address to complete your Discord account setup.\n\nVerify your email at discord.com.\n\nThis link expires in 24 hours. If you didn't create a Discord account, you can ignore this email.\n\nDiscord",
    phishing: false,
    explanation: "Legitimate Discord email verification from @discord.com. It directs you to discord.com and notes you can ignore it if you didn't sign up.",
    hardReason: "", time: "7:44 PM", avatar: "DC", avatarColor: "#5865F2",
  },
  {
    id: 175, hard: true,
    sender: "no-reply@okta.com", senderName: "Okta",
    subject: "Your Okta session from a new device",
    preview: "New device sign-in detected on your Okta account.",
    body: "Hi,\n\nA new device was used to sign in to your Okta account.\n\nDevice: iPhone 15\nLocation: Seattle, WA\nTime: May 28, 2026 at 7:14 PM\n\nIf this was you, no action is needed.\n\nIf this wasn't you, go to your-domain.okta.com/enduser/settings to review and manage your active sessions.\n\nOkta Security",
    phishing: false,
    explanation: "Legitimate Okta security notification from @okta.com. It directs you to your Okta tenant URL for session management and makes no credential request.",
    hardReason: "Okta is an enterprise SSO tool — employees may not recognize @okta.com as the source of their work security alerts. The subdomain format adds to the confusion.",
    time: "7:16 PM", avatar: "OK", avatarColor: "#007DC1",
  },
  {
    id: 176, hard: false,
    sender: "security@bankofamerica-fraud-alert.com", senderName: "Bank of America",
    subject: "Transaction declined: verify your card",
    preview: "Your Bank of America card was declined. Verify to restore access.",
    body: "Dear Customer,\n\nYour Bank of America credit card was declined for a recent transaction.\n\nTo prevent further declines and restore full card functionality, please verify your card details.\n\n→ Verify Card Details\n\nBank of America Security",
    phishing: true,
    explanation: "'bankofamerica-fraud-alert.com' is a fake domain. Bank of America emails come from @bankofamerica.com. Card verification is never done through an email link.",
    hardReason: "", time: "5:47 PM", avatar: "BA", avatarColor: "#e31837",
  },
  {
    id: 177, hard: false,
    sender: "noreply@monday.com", senderName: "Monday.com",
    subject: "New item added to your board: Website Redesign",
    preview: "Priya N. added a new item to 'Website Redesign Q3'.",
    body: "Hi,\n\nPriya N. added a new item to the board 'Website Redesign Q3'.\n\nItem: Update hero section copy\nStatus: In Progress\nOwner: You\n\nView the board at monday.com.\n\nMonday.com",
    phishing: false,
    explanation: "Legitimate Monday.com notification from @monday.com. It directs you to monday.com and makes no credential request.",
    hardReason: "", time: "10:30 AM", avatar: "MO", avatarColor: "#F6305F",
  },
  {
    id: 178, hard: true,
    sender: "notifications@github.com", senderName: "GitHub",
    subject: "You have a new sponsor: @devuser42",
    preview: "@devuser42 is now sponsoring you on GitHub Sponsors.",
    body: "Hi,\n\n@devuser42 is now sponsoring your work on GitHub!\n\nMonthly sponsorship: $10.00\n\nYou can thank your sponsors and manage your GitHub Sponsors profile at github.com/sponsors.\n\nGitHub",
    phishing: false,
    explanation: "Legitimate GitHub Sponsors notification from @notifications.github.com. It directs you to github.com/sponsors and makes no credential request.",
    hardReason: "Unexpected money notification from GitHub makes users suspicious. But GitHub Sponsors is a real feature and these notifications are legitimate.",
    time: "3:50 PM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 179, hard: false,
    sender: "news@microsofft-security-update.com", senderName: "Microsoft",
    subject: "Critical Windows security patch — install now",
    preview: "A critical vulnerability requires an immediate Windows update.",
    body: "Dear Windows User,\n\nA critical security vulnerability has been discovered in Windows 11. This vulnerability allows remote code execution.\n\nMicrosoft has released an emergency patch. You must install it immediately.\n\n→ Download Security Patch Now\n\nMicrosoft Security",
    phishing: true,
    explanation: "'microsofft-security-update.com' doubles the 'f' in Microsoft. Windows security patches are delivered through Windows Update in Settings — never via email links.",
    hardReason: "", time: "9:30 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 180, hard: false,
    sender: "confirmation@airbnb.com", senderName: "Airbnb",
    subject: "Booking confirmed: Paris, France",
    preview: "Your 5-night stay at Le Marais Apartment is confirmed.",
    body: "Your booking is confirmed!\n\nProperty: Le Marais Apartment — Paris, France\nDates: July 10–15, 2026\nGuests: 2\nTotal: $847.00\nHost: Cécile D.\n\nReview your full booking details at airbnb.com/trips.\n\nHave a great trip!\nAirbnb",
    phishing: false,
    explanation: "Legitimate Airbnb booking confirmation from @airbnb.com. It directs you to airbnb.com/trips and makes no request for payment or credentials.",
    hardReason: "", time: "2:22 PM", avatar: "AB", avatarColor: "#FF5A5F",
  },
  {
    id: 181, hard: false,
    sender: "noreply@amaz0n-order-tracking.net", senderName: "Amazon",
    subject: "Your order has shipped",
    preview: "Your Amazon order #113-2948173-9837561 has shipped.",
    body: "Your order has shipped!\n\nOrder #113-2948173-9837561\nItem: Kindle Paperwhite (11th Gen)\nDelivery: May 30, 2026\n\n→ Track Your Order\n\nAmazon",
    phishing: true,
    explanation: "'amaz0n-order-tracking.net' uses zero instead of 'o'. Amazon shipment notifications come from @amazon.com.",
    hardReason: "", time: "11:15 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 182, hard: false,
    sender: "noreply@wordpress.com", senderName: "WordPress",
    subject: "Your WordPress.com site got 500 new visitors today",
    preview: "Your traffic is growing! 500 people visited your site today.",
    body: "Hi,\n\nGreat news — your WordPress.com site had a strong day!\n\nVisitors today: 500\nTop post: 'How to Start a Side Business in 2026'\n\nView your full stats at wordpress.com/stats.\n\nThe WordPress.com Team",
    phishing: false,
    explanation: "Legitimate WordPress.com analytics notification from @wordpress.com. It directs you to wordpress.com/stats and makes no credential request.",
    hardReason: "", time: "8:30 PM", avatar: "WP", avatarColor: "#21759B",
  },
  {
    id: 183, hard: true,
    sender: "automated@helpscout.net", senderName: "Help Scout",
    subject: "Customer reply: 'Re: My order hasn't arrived'",
    preview: "David Kim replied to support ticket #4829.",
    body: "Hi,\n\nDavid Kim replied to a support conversation.\n\nTicket: #4829 — 'My order hasn't arrived'\nReply: 'I still haven't received my package. It's been 10 days. Please resolve this ASAP.'\n\nReply to David at secure.helpscout.net.\n\nHelp Scout",
    phishing: false,
    explanation: "Legitimate Help Scout customer reply notification from @helpscout.net. Help Scout is a real customer support platform, and @helpscout.net is its real domain.",
    hardReason: "helpscout.net may be unfamiliar to users who don't use Help Scout. The subdomain secure.helpscout.net can look suspicious despite being legitimate.",
    time: "11:02 AM", avatar: "HS", avatarColor: "#1292EE",
  },
  {
    id: 184, hard: false,
    sender: "team@discord-nitro-promo.com", senderName: "Discord",
    subject: "You received 3 months of Discord Nitro — free!",
    preview: "A Discord partner sent you 3 months of Nitro. Claim it now.",
    body: "Hey,\n\nA Discord partner has sent you 3 months of Discord Nitro — completely free!\n\nNitro includes HD video, custom emojis, and 2 Server Boosts.\n\n→ Claim Your 3 Months of Nitro\n\nOffer expires in 24 hours.\n\nDiscord",
    phishing: true,
    explanation: "'discord-nitro-promo.com' is not Discord's domain. Discord gift notifications come from @discord.com. Free Nitro scams are one of the most common Discord phishing templates.",
    hardReason: "", time: "7:00 PM", avatar: "DC", avatarColor: "#5865F2",
  },
  {
    id: 185, hard: false,
    sender: "do-not-reply@fedex.com", senderName: "FedEx",
    subject: "Your package was delivered",
    preview: "Package 7489348294831 was delivered to your front door.",
    body: "Hi,\n\nYour package has been delivered.\n\nTracking: 7489348294831\nDelivered: May 28, 2026 at 2:14 PM\nLocation: Front door\n\nFor delivery issues, visit fedex.com/tracking.\n\nFedEx",
    phishing: false,
    explanation: "Legitimate FedEx delivery confirmation from @fedex.com. It directs you to fedex.com/tracking and makes no credential request.",
    hardReason: "", time: "2:15 PM", avatar: "FX", avatarColor: "#4D148C",
  },
  {
    id: 186, hard: false,
    sender: "verify@netf1ix-secure-login.net", senderName: "Netflix",
    subject: "Your password was changed",
    preview: "Your Netflix password was changed. Didn't do this?",
    body: "Hi,\n\nYour Netflix password was recently changed.\n\nIf you made this change, enjoy watching!\n\nIf you didn't make this change, click below to restore your account:\n\n→ Restore Account\n\nNetflix Security",
    phishing: true,
    explanation: "'netf1ix-secure-login.net' uses '1' instead of 'l'. Netflix emails come from @netflix.com.",
    hardReason: "", time: "12:44 AM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 187, hard: true,
    sender: "noreply@coinbase.com", senderName: "Coinbase",
    subject: "Bitcoin withdrawal of $4,200 initiated",
    preview: "A withdrawal of $4,200.00 in Bitcoin has been initiated from your Coinbase account.",
    body: "Hi,\n\nA Bitcoin withdrawal has been initiated from your Coinbase account.\n\nAmount: $4,200.00 (0.063 BTC)\nDestination wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf\nDate: May 28, 2026 at 11:55 PM\n\nIf you authorized this withdrawal, it is now being processed.\n\nIf you did NOT authorize this withdrawal, contact Coinbase support at coinbase.com/security immediately.\n\nCoinbase",
    phishing: false,
    explanation: "Legitimate Coinbase withdrawal notification from @coinbase.com. It directs you to coinbase.com/security and contains no credential-harvesting link. Coinbase does send these real-time withdrawal alerts.",
    hardReason: "Large crypto withdrawal creates extreme panic. Real Coinbase withdrawal alerts look identical to phishing versions — and crypto transactions are irreversible.",
    time: "11:57 PM", avatar: "CB", avatarColor: "#0052FF",
  },
  {
    id: 188, hard: false,
    sender: "offers@netflix-reward-survey.com", senderName: "Netflix",
    subject: "Complete a 3-minute survey — get 6 months free",
    preview: "Netflix wants your feedback. Take a survey and get 6 free months.",
    body: "Dear Netflix Member,\n\nWe'd love your feedback! Complete a 3-minute satisfaction survey and receive 6 months of Netflix free.\n\n→ Start Survey\n\nNetflix Customer Research",
    phishing: true,
    explanation: "'netflix-reward-survey.com' is not Netflix's domain. Netflix never offers free months through survey links.",
    hardReason: "", time: "3:00 PM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 189, hard: false,
    sender: "noreply@hubspot.com", senderName: "HubSpot",
    subject: "Your CRM contact limit is reaching 90%",
    preview: "You've used 90% of your HubSpot free CRM contact limit.",
    body: "Hi,\n\nYou're approaching the contact limit on your HubSpot free plan.\n\nContacts used: 900 of 1,000\n\nUpgrade to HubSpot Starter to remove contact limits and unlock advanced features.\n\nManage your plan at app.hubspot.com.\n\nHubSpot",
    phishing: false,
    explanation: "Legitimate HubSpot usage alert from @hubspot.com. It directs you to app.hubspot.com (HubSpot's real app) and makes no credential request.",
    hardReason: "", time: "9:10 AM", avatar: "HS", avatarColor: "#FF7A59",
  },
  {
    id: 190, hard: false,
    sender: "security@apple-id-suspended.com", senderName: "Apple",
    subject: "Your Apple ID is suspended",
    preview: "Multiple sign-in failures. Your Apple ID has been suspended.",
    body: "Dear Apple Customer,\n\nDue to multiple failed sign-in attempts, your Apple ID has been suspended as a security measure.\n\nTo unsuspend your account:\n\n→ Unsuspend Apple ID\n\nYou must act within 12 hours.\n\nApple",
    phishing: true,
    explanation: "'apple-id-suspended.com' is a fake domain. Apple ID management only happens at appleid.apple.com. Apple does not 'suspend' accounts via unsolicited email with 12-hour deadlines.",
    hardReason: "", time: "8:01 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 191, hard: true,
    sender: "noreply@basecamp.com", senderName: "Basecamp",
    subject: "Jason M. assigned you a to-do",
    preview: "New to-do: 'Review Q3 copywriting brief' — due June 1.",
    body: "Hi,\n\nJason M. assigned a to-do to you in Basecamp.\n\nProject: Q3 Campaign — Creative\nTo-do: Review Q3 copywriting brief\nDue: June 1, 2026\n\nView and complete this to-do at basecamp.com.\n\nBasecamp",
    phishing: false,
    explanation: "Legitimate Basecamp task assignment notification from @basecamp.com. It directs you to basecamp.com and makes no credential request.",
    hardReason: "Users unfamiliar with Basecamp may distrust the email format, which doesn't match Google or Microsoft productivity tools they're used to.",
    time: "11:25 AM", avatar: "BC", avatarColor: "#1D2D35",
  },
  {
    id: 192, hard: false,
    sender: "updates@chase-fraud-center.com", senderName: "Chase",
    subject: "Your Chase Sapphire: reward points expiring",
    preview: "You have 8,420 Chase Ultimate Rewards points expiring May 31.",
    body: "Dear Chase Cardmember,\n\nYou have 8,420 Chase Ultimate Rewards points expiring on May 31, 2026.\n\nRedeem your points for travel, cash back, or gift cards before they expire.\n\n→ Redeem Points Now\n\nChase Ultimate Rewards",
    phishing: true,
    explanation: "'chase-fraud-center.com' is not Chase's domain. Chase emails come from @chase.com. Points expiration pressure is a social engineering tactic.",
    hardReason: "", time: "8:44 AM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 193, hard: false,
    sender: "noreply@zendesk.com", senderName: "Zendesk",
    subject: "Ticket #93847 updated by customer",
    preview: "Lisa Chen updated ticket #93847: 'Billing question on my invoice'.",
    body: "Hi,\n\nLisa Chen updated support ticket #93847.\n\nTicket: Billing question on my invoice\nUpdate: 'I noticed a duplicate charge on my May statement. Can you please look into it?'\n\nReply to Lisa at support.zendesk.com.\n\nZendesk",
    phishing: false,
    explanation: "Legitimate Zendesk ticket update notification from @zendesk.com. It directs you to support.zendesk.com and makes no credential request.",
    hardReason: "", time: "1:33 PM", avatar: "ZD", avatarColor: "#03363D",
  },
  {
    id: 194, hard: true,
    sender: "no-reply@paypal.com", senderName: "PayPal",
    subject: "Important: Your account has been limited",
    preview: "We've limited your account due to unusual activity. Resolve to restore access.",
    body: "Dear Customer,\n\nWe've noticed some unusual activity in your PayPal account. For your protection, we've limited some features.\n\nTo restore full account access, please log in to your PayPal account and complete the required steps. Visit paypal.com to get started. Don't click links in suspicious emails — always type paypal.com directly.\n\nPayPal",
    phishing: false,
    explanation: "Legitimate PayPal account limitation notification from @paypal.com. Notice that it explicitly instructs you to go directly to paypal.com rather than clicking links — exactly what PayPal's real security emails say.",
    hardReason: "The account limitation scenario is identical to thousands of phishing emails. This one is real — distinguished by the explicit 'type paypal.com directly' instruction.",
    time: "3:45 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 195, hard: false,
    sender: "security@cha5e-online.com", senderName: "Chase",
    subject: "Account locked: too many failed attempts",
    preview: "Your Chase account is locked. Unlock it now.",
    body: "Dear Chase Customer,\n\nYour Chase online banking account has been locked after too many failed sign-in attempts.\n\nTo unlock your account, verify your identity:\n\n→ Unlock My Account\n\nChase Security",
    phishing: true,
    explanation: "'cha5e-online.com' substitutes a '5' for the letter 's'. Chase emails come from @chase.com.",
    hardReason: "", time: "9:12 AM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 196, hard: false,
    sender: "no-reply@dhl.com", senderName: "DHL",
    subject: "Your DHL shipment has arrived at the sorting center",
    preview: "DHL shipment 1234567890 is at the sorting center.",
    body: "Hi,\n\nYour DHL Express shipment is on its way.\n\nTracking: 1234567890\nStatus: At sorting center — Frankfurt, Germany\nEstimated delivery: June 2, 2026\n\nTrack your shipment at dhl.com/tracking.\n\nDHL Express",
    phishing: false,
    explanation: "Legitimate DHL shipment notification from @dhl.com. It directs you to dhl.com/tracking and makes no credential request.",
    hardReason: "", time: "6:00 AM", avatar: "DH", avatarColor: "#FFCC00",
  },
  {
    id: 197, hard: true,
    sender: "security@google.com", senderName: "Google",
    subject: "Government-backed attacker may be targeting your account",
    preview: "Google believes a state-sponsored attacker may have targeted you.",
    body: "Hi,\n\nGoogle believes that government-backed attackers may be attempting to steal your password.\n\nWe can't reveal more details about why we believe this, but we wanted to notify you.\n\nWe recommend that you:\n1. Enroll in Google's Advanced Protection Program at g.co/advancedprotection\n2. Update your software\n3. Be cautious of phishing attacks\n\nGoogle Security Team\ngoogle.com/security",
    phishing: false,
    explanation: "This is a real Google notification that Google sends to journalists, activists, and others targeted by state-sponsored hackers. It comes from @google.com and directs you to real Google URLs.",
    hardReason: "The alarming 'government-backed attacker' claim sounds too extreme to be real. But Google does send these — and they're one of the most important security alerts to take seriously.",
    time: "2:18 AM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 198, hard: false,
    sender: "hello@benchmark.com", senderName: "Benchmark Email",
    subject: "Your email campaign 'May Promo' had a 42% open rate",
    preview: "Great results! Your campaign reached 1,200 subscribers.",
    body: "Hi,\n\nYour email campaign 'May Promo' has concluded.\n\nResults:\nSent: 1,200\nOpened: 504 (42%)\nClicked: 98 (8.2%)\nUnsubscribed: 3\n\nView your full campaign report at benchmarkemail.com.\n\nBenchmark Email",
    phishing: false,
    explanation: "Legitimate Benchmark Email campaign results notification from @benchmark.com. It directs you to benchmarkemail.com and makes no credential request.",
    hardReason: "", time: "12:00 PM", avatar: "BE", avatarColor: "#4CAF50",
  },
  {
    id: 199, hard: false,
    sender: "alert@paypa1-international.com", senderName: "PayPal",
    subject: "International payment sent: $1,899.00",
    preview: "You sent $1,899.00 internationally. Didn't do this? Act now.",
    body: "Dear PayPal Member,\n\nAn international payment of $1,899.00 was sent from your account.\n\nRecipient: Unknown\nCountry: Russia\nDate: Today\n\nIf you did NOT authorize this payment, click below to reverse it immediately:\n\n→ Reverse Payment Now\n\nPayPal Fraud Team",
    phishing: true,
    explanation: "'paypa1-international.com' uses '1' instead of 'l'. PayPal emails come from @paypal.com. The large fraudulent international payment is designed to create maximum panic.",
    hardReason: "", time: "4:55 AM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 200, hard: false,
    sender: "noreply@github.com", senderName: "GitHub",
    subject: "Your GitHub repo hit 100 stars",
    preview: "Your repository reached 100 stars!",
    body: "Hi,\n\nCongratulations — your repository just reached 100 stars!\n\nRepository: yourrepo\nStars: 100\n\nThank you to everyone in the open-source community who starred your work.\n\nGitHub",
    phishing: false,
    explanation: "Legitimate GitHub milestone notification from @github.com. It contains no credential request and matches GitHub's standard milestone email format.",
    hardReason: "", time: "11:58 AM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 201, hard: false,
    sender: "your-reward@bestbuy-loyalty-reward.net", senderName: "Best Buy",
    subject: "You earned $75 in Best Buy Reward Certificates",
    preview: "Your Best Buy Totaltech rewards are ready to use.",
    body: "Dear Best Buy Member,\n\nYou've earned $75.00 in Best Buy Reward Certificates!\n\nRedeem your rewards on your next Best Buy purchase.\n\n→ Redeem $75 Reward\n\nRewards expire in 30 days.\n\nBest Buy Rewards",
    phishing: true,
    explanation: "'bestbuy-loyalty-reward.net' is not Best Buy's domain. Best Buy reward emails come from @bestbuy.com.",
    hardReason: "", time: "10:35 AM", avatar: "BB", avatarColor: "#003B64",
  },
  {
    id: 202, hard: false,
    sender: "noreply@gitlab.com", senderName: "GitLab",
    subject: "Pipeline succeeded: deploy-staging",
    preview: "Pipeline #84920 for branch 'feature/dark-mode' passed.",
    body: "Hi,\n\nPipeline #84920 for project yourgroup/yourapp succeeded.\n\nBranch: feature/dark-mode\nStage: deploy-staging\nDuration: 4 minutes 12 seconds\n\nView the pipeline at gitlab.com/yourgroup/yourapp/-/pipelines/84920.\n\nGitLab",
    phishing: false,
    explanation: "Legitimate GitLab CI/CD pipeline notification from @gitlab.com. It directs you to a specific GitLab pipeline URL and makes no credential request.",
    hardReason: "", time: "1:44 PM", avatar: "GL", avatarColor: "#FC6D26",
  },
  {
    id: 203, hard: false,
    sender: "security@paypa1-account-check.org", senderName: "PayPal",
    subject: "Your PayPal account needs attention",
    preview: "We found issues with your account. Resolve them to continue.",
    body: "Dear PayPal User,\n\nWe have identified issues with your PayPal account that require your immediate attention.\n\nPlease log in and resolve these issues within 24 hours.\n\n→ Resolve Issues Now\n\nPayPal",
    phishing: true,
    explanation: "'paypa1-account-check.org' uses '1' instead of 'l' and a .org TLD. Vague 'issues' requiring 'immediate attention' is a classic phishing technique.",
    hardReason: "", time: "6:44 PM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 204, hard: false,
    sender: "no-reply@spotify.com", senderName: "Spotify",
    subject: "An artist you follow just released new music",
    preview: "Kendrick Lamar released a new album: 'Grand National'",
    body: "Hi,\n\nKendrick Lamar, an artist you follow, just released new music.\n\nAlbum: Grand National\nReleased: May 28, 2026\n\nListen now in the Spotify app or at open.spotify.com.\n\nSpotify",
    phishing: false,
    explanation: "Legitimate Spotify new release notification from @spotify.com. It directs you to open.spotify.com and makes no credential request.",
    hardReason: "", time: "9:00 AM", avatar: "SP", avatarColor: "#1DB954",
  },
  {
    id: 205, hard: true,
    sender: "noreply@chase.com", senderName: "Chase",
    subject: "You have a new message in Chase Secure Message Center",
    preview: "Chase sent you a secure message. Sign in to read it.",
    body: "Dear Chase Customer,\n\nYou have a new secure message waiting for you in the Chase Secure Message Center.\n\nTo read your message, sign in to chase.com and navigate to Secure Messages in your profile.\n\nDo not reply directly to this email.\n\nChase",
    phishing: false,
    explanation: "Legitimate Chase secure message notification from @chase.com. Crucially, it tells you to navigate to chase.com yourself rather than clicking a link — exactly how Chase handles sensitive communications.",
    hardReason: "Cryptic 'you have a message' emails are a very common phishing template. This one is legitimate — the tell is being told to navigate directly to the site.",
    time: "10:45 AM", avatar: "CH", avatarColor: "#117ACA",
  },
  {
    id: 206, hard: false,
    sender: "no-reply@amaz0n-review-request.com", senderName: "Amazon",
    subject: "How was your recent purchase?",
    preview: "Rate your experience with your recent Amazon order.",
    body: "Hi,\n\nHow did we do?\n\nPlease take a moment to review your recent purchase:\n\nItem: Wireless Ergonomic Mouse\n\n→ Leave a Review\n\nYour feedback helps other shoppers.\n\nAmazon",
    phishing: true,
    explanation: "'amaz0n-review-request.com' uses zero for 'o'. Amazon review request emails come from @amazon.com.",
    hardReason: "", time: "5:00 PM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 207, hard: false,
    sender: "support@1password.com", senderName: "1Password",
    subject: "New sign-in to 1Password",
    preview: "A new device signed in to your 1Password account.",
    body: "Hi,\n\nA new device has signed in to your 1Password account.\n\nDevice: Chrome on Windows\nLocation: Denver, CO\nTime: May 28, 2026 at 5:30 PM\n\nIf this was you, no action is needed.\n\nIf this wasn't you, change your Master Password and contact 1Password support at support.1password.com.\n\n1Password",
    phishing: false,
    explanation: "Legitimate 1Password security notification from @1password.com. It directs you to support.1password.com and makes no credential request.",
    hardReason: "", time: "5:32 PM", avatar: "1P", avatarColor: "#1A8CFF",
  },
  {
    id: 208, hard: false,
    sender: "account@microsft-office365.com", senderName: "Microsoft 365",
    subject: "Unusual sign-in blocked on your M365 account",
    preview: "We blocked a sign-in from Beijing, China.",
    body: "Microsoft 365\n\nWe blocked a suspicious sign-in to your Microsoft 365 account.\n\nLocation: Beijing, China\nDevice: Unknown\nDate: May 28, 2026\n\nVerify your identity to confirm it was you:\n\n→ Verify Identity\n\nMicrosoft 365 Security",
    phishing: true,
    explanation: "'microsft-office365.com' omits the 'o' in Microsoft. Microsoft 365 security alerts come from @microsoft.com.",
    hardReason: "", time: "3:11 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 209, hard: false,
    sender: "noreply@zoom.us", senderName: "Zoom",
    subject: "Your cloud recording is now available",
    preview: "The recording of 'Team Standup — May 28' is ready.",
    body: "Hi,\n\nYour cloud recording is now available.\n\nMeeting: Team Standup — May 28, 2026\nDuration: 22 minutes\nSize: 142 MB\n\nView or download the recording at zoom.us/recording.\n\nZoom",
    phishing: false,
    explanation: "Legitimate Zoom recording notification from @zoom.us. It directs you to zoom.us/recording and makes no credential request.",
    hardReason: "", time: "9:45 AM", avatar: "ZM", avatarColor: "#2D8CFF",
  },
  {
    id: 210, hard: true,
    sender: "donotreply@amazon.com", senderName: "Amazon",
    subject: "Your recent Amazon review was removed",
    preview: "Your review of 'Sony WH-1000XM5' was removed for violating guidelines.",
    body: "Hello,\n\nYour review of 'Sony WH-1000XM5 Wireless Headphones' has been removed because it did not comply with our Customer Reviews Community Guidelines.\n\nIf you believe this was an error, you can appeal this decision at amazon.com/review/appeal.\n\nAmazon Community",
    phishing: false,
    explanation: "Legitimate Amazon review removal notice from @amazon.com. It directs you to amazon.com/review/appeal and makes no credential or payment request.",
    hardReason: "Unexpected removal notices feel punitive and may prompt users to click impulsively. The real Amazon domain and absence of a credential link confirm legitimacy.",
    time: "1:20 PM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 211, hard: false,
    sender: "team@mailgun.com", senderName: "Mailgun",
    subject: "Your Mailgun account: API key used from new IP",
    preview: "Your Mailgun API key was used from a new IP address.",
    body: "Hi,\n\nYour Mailgun API key was used from a new IP address.\n\nIP: 192.168.100.42\nTime: May 28, 2026 at 8:14 PM\n\nIf this was you, no action is needed.\n\nIf this was not you, rotate your API key immediately at app.mailgun.com.\n\nMailgun",
    phishing: false,
    explanation: "Legitimate Mailgun API security alert from @mailgun.com. It directs you to app.mailgun.com and makes no credential request.",
    hardReason: "", time: "8:16 PM", avatar: "MG", avatarColor: "#F06B50",
  },
  {
    id: 212, hard: false,
    sender: "offers@amazon-prime-special-offer.net", senderName: "Amazon Prime",
    subject: "Limited offer: Amazon Prime at $3.99/month",
    preview: "Exclusive offer: get Amazon Prime for just $3.99/month. Today only!",
    body: "Dear Customer,\n\nFor today only, get Amazon Prime at a special discounted rate of $3.99/month — that's 75% off!\n\nThis offer expires at midnight.\n\n→ Claim $3.99 Prime Rate\n\nAmazon Prime",
    phishing: true,
    explanation: "'amazon-prime-special-offer.net' is not Amazon's domain. Too-good-to-be-true deals with fake urgency are a classic phishing tactic.",
    hardReason: "", time: "10:00 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 213, hard: true,
    sender: "noreply@mail.canva.com", senderName: "Canva",
    subject: "Your Canva Pro trial ends in 2 days",
    preview: "Your 30-day Canva Pro trial expires on May 30. Upgrade to continue.",
    body: "Hi,\n\nYour Canva Pro trial ends in 2 days (May 30, 2026).\n\nUpgrade to Canva Pro to keep access to premium templates, background remover, and brand kits.\n\nManage your subscription at canva.com/pro.\n\nCanva",
    phishing: false,
    explanation: "Legitimate Canva trial expiration notice from @mail.canva.com, Canva's real notification subdomain. It directs you to canva.com/pro and makes no credential request.",
    hardReason: "The @mail.canva.com subdomain looks different from @canva.com, making users suspicious even though it's Canva's real sending address.",
    time: "9:00 AM", avatar: "CV", avatarColor: "#7D2AE8",
  },
  {
    id: 214, hard: false,
    sender: "no-reply@amaz0n-account-restore.com", senderName: "Amazon",
    subject: "Your Amazon account has been suspended",
    preview: "Suspicious activity detected. Restore access now.",
    body: "Dear Amazon Customer,\n\nDue to suspicious activity, your Amazon account has been temporarily suspended.\n\nTo restore your account, please verify your identity and payment method:\n\n→ Restore My Account\n\nYou must act within 24 hours.\n\nAmazon Security",
    phishing: true,
    explanation: "'amaz0n-account-restore.com' uses zero for 'o'. Amazon suspension emails come from @amazon.com.",
    hardReason: "", time: "7:22 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 215, hard: false,
    sender: "noreply@notion.so", senderName: "Notion",
    subject: "Your Notion page was published",
    preview: "Your page 'About Me' is now publicly accessible.",
    body: "Hi,\n\nYour Notion page 'About Me' has been published and is now publicly accessible.\n\nPage URL: notion.so/yourpage\n\nManage your page settings at notion.so.\n\nThe Notion Team",
    phishing: false,
    explanation: "Legitimate Notion page publication notification from @notion.so. It directs you to notion.so and makes no credential request.",
    hardReason: "", time: "3:55 PM", avatar: "NO", avatarColor: "#191919",
  },
  {
    id: 216, hard: true,
    sender: "noreply@google.com", senderName: "Google",
    subject: "Your storage for Google Photos will end soon",
    preview: "High-quality photo backup will end on June 1. Take action.",
    body: "Hi,\n\nStarting June 1, 2026, the high-quality photo backup offer for your Pixel device will end.\n\nPhotos uploaded after June 1 will count toward your Google account storage (15 GB free).\n\nTo continue storing unlimited photos, upgrade to Google One at one.google.com.\n\nGoogle Photos",
    phishing: false,
    explanation: "Legitimate Google Photos policy change notice from @google.com. It directs you to one.google.com and makes no credential request.",
    hardReason: "Policy change emails from large companies are frequently spoofed. The urgency of 'action needed before June 1' makes this easy to flag as phishing.",
    time: "8:00 AM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 217, hard: false,
    sender: "no-reply@paypa1-customer-center.com", senderName: "PayPal",
    subject: "Your account requires verification",
    preview: "Required: complete account verification by May 31.",
    body: "Dear PayPal Customer,\n\nTo comply with new financial regulations, we are asking all customers to complete an identity verification by May 31, 2026.\n\nFailure to verify may result in limited account functionality.\n\n→ Complete Verification\n\nPayPal Compliance Team",
    phishing: true,
    explanation: "'paypa1-customer-center.com' uses '1' instead of 'l'. Regulatory compliance deadlines are a newer pressure tactic in financial phishing.",
    hardReason: "", time: "11:20 AM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 218, hard: false,
    sender: "newsletter@substack.com", senderName: "Substack",
    subject: "New post from 'The Pragmatic Engineer'",
    preview: "Gergely Orosz published: 'The State of Engineering in 2026'.",
    body: "Hi,\n\nGergely Orosz published a new post.\n\nThe Pragmatic Engineer\n'The State of Engineering in 2026'\n\nRead the full post at thepragmaticengineer.substack.com.\n\nSubstack",
    phishing: false,
    explanation: "Legitimate Substack newsletter notification from @substack.com. It directs you to the publisher's Substack URL and makes no credential request.",
    hardReason: "", time: "10:00 AM", avatar: "SU", avatarColor: "#FF6719",
  },
  {
    id: 219, hard: false,
    sender: "help@microsoft-365-account-alert.com", senderName: "Microsoft",
    subject: "Your OneDrive files will be deleted",
    preview: "Account flagged. Your OneDrive files will be deleted in 72 hours.",
    body: "Dear Microsoft User,\n\nYour OneDrive account has been flagged for inactivity.\n\nAll your stored files, photos, and documents will be permanently deleted in 72 hours unless you verify your account.\n\n→ Verify Account to Prevent Deletion\n\nMicrosoft OneDrive",
    phishing: true,
    explanation: "'microsoft-365-account-alert.com' is a fake domain. Microsoft never threatens to delete OneDrive files via unsolicited email with 72-hour deadlines.",
    hardReason: "", time: "8:33 AM", avatar: "MS", avatarColor: "#00a4ef",
  },
  {
    id: 220, hard: false,
    sender: "accounts@google.com", senderName: "Google",
    subject: "New sign-in on iPhone",
    preview: "A new iPhone signed in to your Google account.",
    body: "Hi,\n\nYour Google Account was signed in to on a new iPhone.\n\nDevice: iPhone 15 Pro\nLocation: San Francisco, CA\nTime: May 28, 2026 at 10:03 AM\n\nIf this was you, no action is needed.\n\nIf you don't recognize this sign-in, review your account at myaccount.google.com.\n\nGoogle",
    phishing: false,
    explanation: "Legitimate Google device sign-in alert from @accounts.google.com. It directs you to myaccount.google.com and contains no embedded login link.",
    hardReason: "", time: "10:05 AM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 221, hard: true,
    sender: "security@twitter.com", senderName: "X (Twitter)",
    subject: "Your X account is now verified",
    preview: "Congratulations! Your X account has been verified.",
    body: "Hi,\n\nCongratulations — your account has been approved for X Premium verification.\n\nYour blue checkmark is now active.\n\nTo set up your profile, sign in at x.com. If you have questions, visit help.twitter.com.\n\nX",
    phishing: false,
    explanation: "Legitimate X (Twitter) verification notification from @twitter.com. It directs you to x.com and help.twitter.com. No credential request is made.",
    hardReason: "An unexpected verification badge email looks like a classic 'you've been selected' phishing hook. But X does send these automatically when Premium subscriptions clear verification.",
    time: "11:30 AM", avatar: "X", avatarColor: "#000000",
  },
  {
    id: 222, hard: false,
    sender: "noreply@amazon-prime-offer.info", senderName: "Amazon",
    subject: "Black Friday early access: members only",
    preview: "Early Black Friday deals, exclusively for Prime members.",
    body: "Dear Prime Member,\n\nYou have exclusive early access to Black Friday deals!\n\nShop now before inventory runs out:\n\n→ Access Early Black Friday Deals\n\nOffers valid today only.\n\nAmazon Prime",
    phishing: true,
    explanation: "'amazon-prime-offer.info' is not Amazon's domain. The .info TLD is a strong red flag for phishing.",
    hardReason: "", time: "9:01 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 223, hard: false,
    sender: "notifications@apple.com", senderName: "Apple",
    subject: "iCloud Drive: file shared with you",
    preview: "Tyler R. shared 'Campaign Brief.pdf' with you via iCloud Drive.",
    body: "Hi,\n\nTyler R. (t.reynolds@mediagroup.com) shared a file with you via iCloud Drive.\n\nFile: Campaign Brief.pdf\n\nAccess the shared file at icloud.com/iclouddrive.\n\nApple",
    phishing: false,
    explanation: "Legitimate Apple iCloud Drive share notification from @apple.com. It directs you to icloud.com/iclouddrive (Apple's real iCloud URL) and makes no credential request.",
    hardReason: "", time: "2:40 PM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 224, hard: true,
    sender: "no-reply@lyft.com", senderName: "Lyft",
    subject: "Your Lyft account password was reset",
    preview: "Your Lyft password was recently changed.",
    body: "Hi,\n\nYour Lyft account password was recently changed.\n\nIf you made this change, you're all set.\n\nIf you didn't make this change, please secure your account by visiting account.lyft.com and changing your password.\n\nLyft",
    phishing: false,
    explanation: "Legitimate Lyft password change notification from @lyft.com. It directs you to account.lyft.com and makes no credential request.",
    hardReason: "Password change notifications are heavily phished. This is a real Lyft notification — the absence of an embedded 'click here to reverse this' link is the key distinction.",
    time: "9:30 PM", avatar: "LY", avatarColor: "#EA0B8C",
  },
  {
    id: 225, hard: false,
    sender: "noreply@docusign-signing-alert.com", senderName: "DocuSign",
    subject: "URGENT: Your contract expires in 1 hour",
    preview: "Sign now or the contract will be voided.",
    body: "URGENT\n\nYour DocuSign document is about to expire!\n\nDocument: Vendor Agreement — Summer 2026\nExpires: In 1 hour\n\nSign immediately to avoid voiding:\n\n→ SIGN NOW\n\nDocuSign",
    phishing: true,
    explanation: "'docusign-signing-alert.com' is not DocuSign's domain. DocuSign emails come from @docusign.net. The 1-hour expiration is an extreme pressure tactic.",
    hardReason: "", time: "11:02 AM", avatar: "DS", avatarColor: "#FFCC00",
  },
  {
    id: 226, hard: true,
    sender: "aws-billing@amazon.com", senderName: "AWS",
    subject: "AWS invoice for May 2026: $1,284.22",
    preview: "Your AWS bill for May 2026 is ready.",
    body: "Hello,\n\nYour AWS bill for May 2026 is now available.\n\nAccount: 1234-5678-9012\nInvoice period: May 1–31, 2026\nTotal: $1,284.22\n\nView your invoice and manage your account at console.aws.amazon.com.\n\nAmazon Web Services",
    phishing: false,
    explanation: "Legitimate AWS billing notification from @amazon.com (AWS uses the amazon.com domain for billing). It directs you to console.aws.amazon.com (AWS's real console) and makes no credential request.",
    hardReason: "AWS billing emails come from @amazon.com — confusing for users who expect @aws.com. The large dollar amount creates urgency.",
    time: "8:01 AM", avatar: "AW", avatarColor: "#FF9900",
  },
  {
    id: 227, hard: false,
    sender: "no-reply@googIe-security.com", senderName: "Google Security",
    subject: "Suspicious login blocked on your Google account",
    preview: "We blocked a login from North Korea. Verify your account.",
    body: "Dear Google User,\n\nWe have blocked a suspicious login to your Google Account from North Korea.\n\nYour account is at risk. Verify your identity immediately to prevent unauthorized access.\n\n→ Verify My Google Account\n\nGoogle Security Team",
    phishing: true,
    explanation: "'googIe-security.com' uses a capital 'I' instead of lowercase 'l' — a homograph attack. Real Google security alerts come from @accounts.google.com. The 'North Korea' scare tactic is designed to trigger panic.",
    hardReason: "", time: "2:00 AM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 228, hard: false,
    sender: "noreply@duolingo.com", senderName: "Duolingo",
    subject: "You've unlocked a new league!",
    preview: "Congratulations — you've been promoted to the Diamond League.",
    body: "Congratulations!\n\nYou've been promoted to the Diamond League — Duolingo's top tier!\n\nKeep learning to stay at the top of the leaderboard.\n\nOpen Duolingo to see your standings.\n\nDuo and the Duolingo Team",
    phishing: false,
    explanation: "Legitimate Duolingo promotion notification from @duolingo.com. It directs you to the Duolingo app and makes no credential or payment request.",
    hardReason: "", time: "7:00 AM", avatar: "DL", avatarColor: "#58CC02",
  },
  {
    id: 229, hard: true,
    sender: "hello@mix.com", senderName: "Mix",
    subject: "Your Mix digest: top links this week",
    preview: "See the top articles curated for you this week.",
    body: "Hi,\n\nHere's your weekly Mix digest — the top links based on your interests.\n\nTop picks this week:\n• 'The Future of Remote Work' — HBR\n• 'How I Built a $1M Side Business' — Inc.\n• 'The Quiet Case for Slower Tech' — Wired\n\nOpen Mix to explore more at mix.com.\n\nThe Mix Team",
    phishing: false,
    explanation: "Legitimate Mix content digest from @mix.com. Mix is a real content discovery platform. The email directs you to mix.com and makes no credential request.",
    hardReason: "Mix is a lesser-known platform, making its emails seem suspicious to users unfamiliar with it.",
    time: "8:30 AM", avatar: "MX", avatarColor: "#FF3B2F",
  },
  {
    id: 230, hard: false,
    sender: "noreply@microsoft-teams-alert.net", senderName: "Microsoft Teams",
    subject: "New message from your manager",
    preview: "Jennifer Walsh sent you an urgent message in Teams.",
    body: "Hi,\n\nYour manager Jennifer Walsh sent you an urgent message in Microsoft Teams.\n\n'I need you to handle something for me immediately. It's urgent — check Teams now.'\n\n→ Open Microsoft Teams\n\nMicrosoft Teams",
    phishing: true,
    explanation: "'microsoft-teams-alert.net' is not Microsoft's domain. Teams emails come from @microsoft.com. Fake 'urgent message from your manager' emails in Teams format are increasingly common social engineering attacks.",
    hardReason: "", time: "9:48 AM", avatar: "MT", avatarColor: "#6264A7",
  },
  {
    id: 231, hard: false,
    sender: "billing@squarespace.com", senderName: "Squarespace",
    subject: "Your annual Squarespace plan renews on June 15",
    preview: "Your Squarespace Business plan renews on June 15. No action needed.",
    body: "Hi,\n\nYour annual Squarespace Business plan renews on June 15, 2026.\n\nPlan: Business\nRenewal amount: $276.00/year\nCard: Visa ending in 4821\n\nNo action is required — your subscription will renew automatically.\n\nManage your subscription at squarespace.com/account.\n\nSquarespace",
    phishing: false,
    explanation: "Legitimate Squarespace renewal reminder from @squarespace.com. It directs you to squarespace.com/account and makes no request for new payment information.",
    hardReason: "", time: "9:00 AM", avatar: "SS", avatarColor: "#000000",
  },
  {
    id: 232, hard: true,
    sender: "noreply@dropbox.com", senderName: "Dropbox",
    subject: "Your Dropbox account will be downgraded",
    preview: "Dropbox detected you haven't upgraded. Your account downgrades in 7 days.",
    body: "Hi,\n\nYour Dropbox Plus trial has ended. In 7 days, your account will be downgraded to the free plan.\n\nAfter downgrade, files exceeding 2 GB will become inaccessible until you reduce your storage.\n\nUpgrade to Dropbox Plus to keep all your files accessible.\n\nManage your plan at dropbox.com/account/plan.\n\nDropbox",
    phishing: false,
    explanation: "Legitimate Dropbox plan downgrade notification from @dropbox.com. It directs you to dropbox.com/account/plan and makes no credential request.",
    hardReason: "Plan downgrade threats feel like phishing pressure tactics but this is a real Dropbox notification.",
    time: "2:30 PM", avatar: "DB", avatarColor: "#0061ff",
  },
  {
    id: 233, hard: false,
    sender: "no-reply@googleplay-gift-code.com", senderName: "Google Play",
    subject: "You received a $50 Google Play gift card",
    preview: "A $50 Google Play credit is waiting for you.",
    body: "Hi,\n\nYou've received a $50 Google Play gift card!\n\nRedemption code: GPAY-XXXX-XXXX-4921\n\nTo redeem, sign in to your Google account:\n\n→ Redeem Gift Card\n\nThis code expires in 7 days.\n\nGoogle Play",
    phishing: true,
    explanation: "'googleplay-gift-code.com' is not Google's domain. Google Play gift card redemptions happen through the Google Play app — never via an emailed login link.",
    hardReason: "", time: "1:00 PM", avatar: "GP", avatarColor: "#01875f",
  },
  {
    id: 234, hard: false,
    sender: "noreply@figma.com", senderName: "Figma",
    subject: "Your Figma account was accessed from a new device",
    preview: "New device sign-in on your Figma account.",
    body: "Hi,\n\nYour Figma account was accessed from a new device.\n\nDevice: Chrome on Windows\nLocation: Chicago, IL\nTime: May 28, 2026 at 4:12 PM\n\nIf this was you, no action is needed.\n\nIf this wasn't you, secure your account at figma.com/settings/security.\n\nFigma Security",
    phishing: false,
    explanation: "Legitimate Figma security alert from @figma.com. It directs you to figma.com/settings/security and makes no credential request.",
    hardReason: "", time: "4:14 PM", avatar: "FG", avatarColor: "#F24E1E",
  },
  {
    id: 235, hard: true,
    sender: "billing@openai.com", senderName: "OpenAI",
    subject: "Your ChatGPT Plus subscription renews tomorrow",
    preview: "ChatGPT Plus renews for $20 on May 29. Manage your plan.",
    body: "Hi,\n\nYour ChatGPT Plus subscription renews tomorrow.\n\nPlan: ChatGPT Plus\nAmount: $20.00/month\nNext billing date: May 29, 2026\nCard: Visa ending in 4821\n\nManage your subscription at platform.openai.com.\n\nOpenAI",
    phishing: false,
    explanation: "Legitimate OpenAI billing notification from @openai.com. It directs you to platform.openai.com (OpenAI's real platform) and makes no credential request.",
    hardReason: "OpenAI is a newer brand with less recognition in email. Users may not expect @openai.com to be the source of their ChatGPT billing.",
    time: "11:00 AM", avatar: "OA", avatarColor: "#10A37F",
  },
  {
    id: 236, hard: false,
    sender: "service@netflix-billing-suspended.com", senderName: "Netflix",
    subject: "Your Netflix is suspended",
    preview: "Due to a billing issue, your Netflix is suspended.",
    body: "Dear Netflix Member,\n\nYour Netflix account has been suspended due to a billing problem.\n\nTo reactivate your account, update your payment information within 24 hours.\n\n→ Reactivate Netflix Now\n\nNetflix Billing",
    phishing: true,
    explanation: "'netflix-billing-suspended.com' is a fake domain. Netflix emails come from @netflix.com.",
    hardReason: "", time: "6:30 AM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 237, hard: false,
    sender: "hello@buffer.com", senderName: "Buffer",
    subject: "Your social posts are scheduled for this week",
    preview: "14 posts are scheduled across Twitter, LinkedIn, and Instagram.",
    body: "Hi,\n\nYou have posts scheduled for this week.\n\nScheduled this week: 14 posts\nPlatforms: X (Twitter), LinkedIn, Instagram\nNext post: May 29 at 9:00 AM\n\nManage your schedule at buffer.com.\n\nBuffer",
    phishing: false,
    explanation: "Legitimate Buffer social media scheduling notification from @buffer.com. It directs you to buffer.com and makes no credential request.",
    hardReason: "", time: "7:30 AM", avatar: "BF", avatarColor: "#2C4BFF",
  },
  {
    id: 238, hard: false,
    sender: "no-reply@amazon-verify-account.com", senderName: "Amazon",
    subject: "Your Amazon account information needs updating",
    preview: "Account information is outdated. Update to continue shopping.",
    body: "Dear Customer,\n\nAmazon requires you to update your account information to continue using Amazon services.\n\nPlease update your information within 3 days.\n\n→ Update Account Information\n\nAmazon",
    phishing: true,
    explanation: "'amazon-verify-account.com' is not Amazon's domain. The vague 'information needs updating' prompt without specifics is a red flag.",
    hardReason: "", time: "10:22 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 239, hard: true,
    sender: "noreply@google.com", senderName: "Google",
    subject: "Action recommended: enable Enhanced Safe Browsing",
    preview: "Protect your Google account with Enhanced Safe Browsing.",
    body: "Hi,\n\nWe recommend enabling Enhanced Safe Browsing on your Google Account for stronger protection against dangerous sites and downloads.\n\nEnhanced Safe Browsing shares URL data with Google for real-time threat detection.\n\nEnable it at myaccount.google.com/security.\n\nGoogle Security",
    phishing: false,
    explanation: "Legitimate Google security recommendation from @google.com. It directs you to myaccount.google.com and requires no action beyond a personal security setting choice.",
    hardReason: "Proactive 'enable this security feature' emails from large companies are a known phishing vector. This one is real — no links to click, only a plain URL to visit.",
    time: "10:00 AM", avatar: "G", avatarColor: "#4285f4",
  },
  {
    id: 240, hard: false,
    sender: "news@linkedln-opportunities.com", senderName: "LinkedIn",
    subject: "New jobs in your area matching your profile",
    preview: "7 new jobs near you: Software Engineer, Product Manager...",
    body: "Hi,\n\nWe found new jobs near you that match your skills:\n\n• Senior Software Engineer — Google\n• Product Manager — Meta\n• UX Researcher — Apple\n\n→ View All Job Matches\n\nLinkedIn Jobs",
    phishing: true,
    explanation: "'linkedln-opportunities.com' swaps 'i' for 'l' in LinkedIn. Real LinkedIn job alerts come from @linkedin.com.",
    hardReason: "", time: "8:15 AM", avatar: "LI", avatarColor: "#0a66c2",
  },
  {
    id: 241, hard: false,
    sender: "noreply@apple.com", senderName: "Apple",
    subject: "Your Apple Watch just detected an irregular heart rhythm",
    preview: "Apple Watch detected an irregular heart rhythm. Review in Health.",
    body: "Hi,\n\nYour Apple Watch detected an irregular heart rhythm that may indicate atrial fibrillation (AFib).\n\nThis is not a medical emergency. Open the Health app on your iPhone to review the notification and follow recommended next steps, which may include speaking with your doctor.\n\nApple Watch Health Notifications",
    phishing: false,
    explanation: "Legitimate Apple health notification from @apple.com. It directs you to the Health app on your iPhone and contains no login request. Apple does send these health alerts.",
    hardReason: "", time: "3:02 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 242, hard: true,
    sender: "do-not-reply@wellsfargo.com", senderName: "Wells Fargo",
    subject: "Wire transfer initiated: $22,500.00",
    preview: "A wire transfer of $22,500 was initiated from your account.",
    body: "Dear Customer,\n\nA wire transfer has been initiated from your Wells Fargo account.\n\nAmount: $22,500.00\nRecipient: Hong Kong International Trading Ltd.\nDate: May 28, 2026\n\nIf you authorized this transfer, processing will complete within 1 business day.\n\nIf you did NOT authorize this transfer, call Wells Fargo immediately at 1-800-869-3557 or visit wellsfargo.com.\n\nWells Fargo",
    phishing: false,
    explanation: "Legitimate Wells Fargo wire transfer notification from @wellsfargo.com. It provides a real customer service number and directs you to wellsfargo.com.",
    hardReason: "A $22,500 wire to an international company creates extreme panic. Real Wells Fargo wire alerts look identical to phishing versions.",
    time: "11:48 PM", avatar: "WF", avatarColor: "#D71E28",
  },
  {
    id: 243, hard: false,
    sender: "alerts@paypa1-new-device.net", senderName: "PayPal",
    subject: "New device login detected",
    preview: "A new device logged in to your PayPal account.",
    body: "Dear Customer,\n\nA new device just logged in to your PayPal account.\n\nDevice: Unknown Android\nLocation: Jakarta, Indonesia\nTime: Today\n\nIf this was not you, secure your account immediately:\n\n→ Secure My Account\n\nPayPal Security",
    phishing: true,
    explanation: "'paypa1-new-device.net' uses '1' instead of 'l'. PayPal security alerts come from @paypal.com.",
    hardReason: "", time: "3:17 AM", avatar: "PP", avatarColor: "#003087",
  },
  {
    id: 244, hard: false,
    sender: "no-reply@github.com", senderName: "GitHub",
    subject: "GitHub Copilot: your subscription is active",
    preview: "GitHub Copilot Individual is now active on your account.",
    body: "Hi,\n\nGitHub Copilot Individual is now active on your GitHub account.\n\nYou'll be billed $10.00/month. Manage your subscription at github.com/settings/copilot.\n\nGitHub",
    phishing: false,
    explanation: "Legitimate GitHub Copilot subscription confirmation from @github.com. It directs you to github.com/settings/copilot and makes no credential request.",
    hardReason: "", time: "12:05 PM", avatar: "GH", avatarColor: "#24292f",
  },
  {
    id: 245, hard: true,
    sender: "compliance@stripe.com", senderName: "Stripe",
    subject: "Action required: update your business information by June 1",
    preview: "New regulations require you to update your Stripe business details.",
    body: "Hi,\n\nNew financial regulations require Stripe to collect additional information about your business by June 1, 2026.\n\nFailure to update your information may result in your Stripe account being paused.\n\nUpdate your business information at dashboard.stripe.com/settings/business.\n\nStripe Compliance Team",
    phishing: false,
    explanation: "Legitimate Stripe compliance request from @stripe.com. It directs you to dashboard.stripe.com/settings/business and makes no credential request.",
    hardReason: "Compliance deadlines with account suspension threats are a top phishing template. This is a real Stripe email — identified by the real subdomain link.",
    time: "9:00 AM", avatar: "ST", avatarColor: "#635BFF",
  },
  {
    id: 246, hard: false,
    sender: "gift@amaz0n-gift-reward.com", senderName: "Amazon",
    subject: "You've been selected for a $100 Amazon voucher",
    preview: "Exclusive voucher for loyal Amazon customers.",
    body: "Dear Loyal Customer,\n\nYou've been selected to receive a $100 Amazon shopping voucher!\n\nRedeem your voucher before it expires:\n\n→ Claim $100 Voucher\n\nThis offer expires in 48 hours.\n\nAmazon Customer Appreciation",
    phishing: true,
    explanation: "'amaz0n-gift-reward.com' uses zero for 'o'. Amazon voucher promotions come from @amazon.com.",
    hardReason: "", time: "11:00 AM", avatar: "AZ", avatarColor: "#FF9900",
  },
  {
    id: 247, hard: false,
    sender: "noreply@miro.com", senderName: "Miro",
    subject: "Alex K. shared a board with you: Product Roadmap",
    preview: "Alex K. invited you to collaborate on 'Product Roadmap 2026-2027'.",
    body: "Hi,\n\nAlex K. (alex.k@designstudio.io) shared a Miro board with you.\n\nBoard: Product Roadmap 2026–2027\n\nJoin the board and collaborate at miro.com.\n\nMiro",
    phishing: false,
    explanation: "Legitimate Miro board share notification from @miro.com. It directs you to miro.com and makes no credential request.",
    hardReason: "", time: "10:00 AM", avatar: "MI", avatarColor: "#FFD02F",
  },
  {
    id: 248, hard: false,
    sender: "noreply@netf1ix-payment-issue.com", senderName: "Netflix",
    subject: "Payment failed — account on hold",
    preview: "We couldn't process your payment. Your account is on hold.",
    body: "Dear Member,\n\nWe were unable to process your recent payment.\n\nYour account is currently on hold.\n\nResolve this immediately to continue watching:\n\n→ Fix Payment Issue\n\nNetflix",
    phishing: true,
    explanation: "'netf1ix-payment-issue.com' uses '1' instead of 'l'. Netflix emails come from @netflix.com.",
    hardReason: "", time: "7:50 PM", avatar: "N", avatarColor: "#e50914",
  },
  {
    id: 249, hard: true,
    sender: "noreply@apple.com", senderName: "Apple",
    subject: "Your Apple ID: password reset requested",
    preview: "A password reset was requested for your Apple ID.",
    body: "Hi,\n\nA password reset was requested for your Apple ID.\n\nIf you didn't request a password reset, you can ignore this email. Your password won't change.\n\nIf you did request a reset, follow the instructions sent to your trusted device or visit iforgot.apple.com.\n\nApple",
    phishing: false,
    explanation: "Legitimate Apple password reset notification from @apple.com. It reassures you that ignoring the email is safe if you didn't request a reset, and directs you to iforgot.apple.com (Apple's real password recovery site).",
    hardReason: "Password reset emails from any service are phishing red flags. This one is real — distinguished by the calm tone and the instruction that you can simply ignore it.",
    time: "1:11 AM", avatar: "AP", avatarColor: "#1d1d1f",
  },
  {
    id: 250, hard: false,
    sender: "notifications@slack.com", senderName: "Slack",
    subject: "Reminder: you have 4 unread messages",
    preview: "You have 4 unread messages across 3 channels.",
    body: "Hi,\n\nYou have 4 unread messages in Slack.\n\nUnread in: #general, #design-team, #random\n\nOpen Slack to catch up at slack.com.\n\nThe Slack Team",
    phishing: false,
    explanation: "Legitimate Slack unread message digest from @slack.com. It directs you to slack.com and makes no credential request.",
    hardReason: "", time: "8:00 AM", avatar: "SL", avatarColor: "#4A154B",
  }
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function renderBodyWithLinks(text) {
  // Match arrow (→) followed by link text
  const parts = text.split(/(→[^\n]+)/);
  return parts.map(function(part, i) {
    if (part.startsWith("→")) {
      return (
        <span key={i} style={{ color: "#1e90ff", textDecoration: "underline", cursor: "default" }}>
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [dismissed, setDismissed] = useState([]);
  const [activeId, setActiveId] = useState(null);

  function startQuiz(n) {
    const selected = shuffle(ALL_EMAILS).slice(0, Math.min(n, ALL_EMAILS.length));
    setQuiz(selected);
    setAnswers({});
    setDismissed([]);
    setActiveId(selected[0] ? selected[0].id : null);
    setScreen("quiz");
  }

  function handleAnswer(emailId, choice) {
    const email = quiz.find(function(e) { return e.id === emailId; });
    const correct = (choice === "phishing") === email.phishing;
    const newAnswers = Object.assign({}, answers, { [emailId]: { choice, correct } });
    setAnswers(newAnswers);
    setDismissed(function(d) { return d.concat([emailId]); });
    setTimeout(function() {
      const remaining = quiz.filter(function(e) { return !newAnswers[e.id]; });
      if (remaining.length > 0) {
        setActiveId(remaining[0].id);
      } else {
        setScreen("results");
      }
    }, 320);
  }

  let content = null;
  if (screen === "landing") {
    content = <Landing onStart={startQuiz} />;
  } else if (screen === "quiz") {
    content = (
      <QuizScreen
        quiz={quiz}
        answers={answers}
        dismissed={dismissed}
        activeId={activeId}
        setActiveId={setActiveId}
        onAnswer={handleAnswer}
        onReset={function() { setScreen("landing"); }}
      />
    );
  } else if (screen === "results") {
    content = (
      <ResultsScreen
        quiz={quiz}
        answers={answers}
        onRestart={function() { startQuiz(quiz.length); }}
        onHome={function() { setScreen("landing"); }}
      />
    );
  }

  return (
    <>
      {content}
      <CopyrightGhost />
    </>
  );
}

function CopyrightGhost() {
  return (
    <div style={{
      position: "fixed",
      left: 16,
      bottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "rgba(255, 255, 255, 0.92)",
      border: "1px solid rgba(0, 0, 0, 0.08)",
      borderRadius: 10,
      padding: "8px 12px",
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.08)",
      fontSize: 12,
      color: "#3c4043",
      zIndex: 1000,
      pointerEvents: "none",
    }}>
      <span>{"Copyright gh{}st"}</span>
    </div>
  );
}

function HardBadge() {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: "#fef3cd", color: "#7d4e00", borderRadius: 3, padding: "1px 5px", flexShrink: 0, letterSpacing: 0.3 }}>
      HARD
    </span>
  );
}

function FishMailLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#E0F2FE" />

      <path
        d="
          M8 20
          C12 12 24 12 28 20
          C24 28 12 28 8 20
          Z
        "
        fill="#F97316"
      />

      <path
        d="
          M28 20
          L36 14
          L36 26
          Z
        "
        fill="#EA580C"
      />

      <circle cx="14" cy="18" r="1.2" fill="#111827" />
    </svg>
  );
}

function Landing({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f1f3f4", fontFamily: "'Segoe UI', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      <header style={{ background: "white", borderBottom: "1px solid #e0e0e0", padding: "0 32px", height: 60, display: "flex", alignItems: "center", gap: 8 }}>
        <FishMailLogo />
        <span style={{ fontSize: 21, color: "#5f6368", fontWeight: 300, marginLeft: 4 }}>FishMail</span>
        <div style={{ marginLeft: "auto", background: "#1a73e8", color: "white", borderRadius: 4, padding: "6px 14px", fontSize: 13, fontWeight: 500 }}>
          PhishGuard Training
        </div>
      </header>

      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 1, padding: "64px 72px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1.5, color: "#1a73e8", textTransform: "uppercase", marginBottom: 16 }}>
            Security Awareness Training
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: "#202124", lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 16, maxWidth: 500 }}>
            Can you spot the phish?
          </h1>
          <p style={{ fontSize: 16, color: "#5f6368", lineHeight: 1.8, maxWidth: 460, marginBottom: 40 }}>
            Train your eye to catch fake domains, urgency tactics, and spoofed senders before they catch you.
          </p>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: "#80868b", marginBottom: 12 }}>Select quiz length to begin:</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[1, 5, 10, 25, 50].map(function(n, i) {
                return (
                  <button
                    key={n}
                    onClick={function() { onStart(n); }}
                    style={{
                      padding: "10px 22px",
                      borderRadius: 4,
                      border: i === 1 ? "none" : "1px solid #dadce0",
                      background: i === 1 ? "#1a73e8" : "white",
                      color: i === 1 ? "white" : "#3c4043",
                      fontSize: 14,
                      fontWeight: i === 1 ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {n === 1 ? "1 question" : n + " questions"}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 32 }}>
            {[
              { stat: "96%", label: "of attacks start with email" },
              { stat: "3.4B", label: "phishing emails sent daily" },
              { stat: "$4.9M", label: "average breach cost" },
            ].map(function(s) {
              return (
                <div key={s.stat}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: "#202124", letterSpacing: -0.5 }}>{s.stat}</div>
                  <div style={{ fontSize: 12, color: "#80868b", marginTop: 2 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ width: 400, background: "white", borderLeft: "1px solid #e0e0e0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #e0e0e0", fontSize: 13, color: "#80868b", fontWeight: 500 }}>
            Sample inbox — can you tell which is fake?
          </div>
          {ALL_EMAILS.slice(0, 6).map(function(e, i) {
            return (
              <div key={e.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "11px 20px", borderBottom: "1px solid #f1f3f4", background: i === 0 ? "#f8f9fa" : "white" }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: e.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{e.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: i < 2 ? 600 : 400, color: "#202124" }}>{e.senderName}</span>
                    <span style={{ fontSize: 11, color: "#80868b" }}>{e.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#202124", fontWeight: i < 2 ? 500 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.subject}</div>
                  <div style={{ fontSize: 11, color: "#80868b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.preview}</div>
                </div>
              </div>
            );
          })}
          <div onClick={function() { onStart(5); }} style={{ padding: "12px 20px", fontSize: 12, color: "#1a73e8", textAlign: "center", cursor: "pointer", borderTop: "1px solid #f1f3f4" }}>
            Start training with 5 questions
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ quiz, answers, dismissed, activeId, setActiveId, onAnswer, onReset }) {
  const active = quiz.find(function(e) { return e.id === activeId; });
  const remaining = quiz.filter(function(e) { return !answers[e.id]; });
  const total = quiz.length;
  const done = total - remaining.length;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#f6f8fc", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ height: 60, background: "white", display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid #e0e0e0", flexShrink: 0, gap: 12 }}>
        <FishMailLogo />
        <span style={{ fontSize: 21, color: "#5f6368", fontWeight: 300, marginLeft: 4 }}>FishMail</span>
        <div style={{ flex: 1, maxWidth: 600, margin: "0 16px" }}>
          <div style={{ background: "#eaf1fb", borderRadius: 24, padding: "7px 18px", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span style={{ color: "#5f6368", fontSize: 14 }}>Search mail</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 13, color: "#5f6368" }}>
            <strong style={{ color: "#202124" }}>{done}</strong>/{total} classified
          </span>
          <button onClick={onReset} style={{ background: "none", border: "none", fontSize: 13, color: "#5f6368", cursor: "pointer", padding: "6px 10px", borderRadius: 4 }}>
            Quit
          </button>
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#4285f4", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 600, fontSize: 13 }}>U</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ width: 230, background: "white", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "10px 8px" }}>
            <div style={{ background: "#c2e7ff", borderRadius: 16, padding: "12px 18px", marginBottom: 4, cursor: "default", fontSize: 14, fontWeight: 600, color: "#001d35" }}>
              Compose
            </div>
          </div>
          {[
            { label: "Inbox", count: remaining.length, active: true },
            { label: "Starred", count: 0, active: false },
            { label: "Snoozed", count: 0, active: false },
            { label: "Sent", count: 0, active: false },
            { label: "Drafts", count: 0, active: false },
          ].map(function(item) {
            return (
              <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "1px 8px 1px 0", padding: "8px 16px", borderRadius: "0 20px 20px 0", background: item.active ? "#d3e3fd" : "transparent" }}>
                <span style={{ fontSize: 14, fontWeight: item.active ? 700 : 400, color: "#202124" }}>{item.label}</span>
                {item.count > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: "#202124" }}>{item.count}</span>}
              </div>
            );
          })}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "12px 16px", borderTop: "1px solid #e0e0e0" }}>
            <div style={{ fontSize: 12, color: "#80868b", marginBottom: 6 }}>Progress</div>
            <div style={{ height: 4, background: "#e0e0e0", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: (done / total * 100) + "%", background: "#1a73e8", transition: "width 0.3s" }} />
            </div>
            <div style={{ fontSize: 11, color: "#80868b", marginTop: 4 }}>{done} of {total} done</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <div style={{ width: 300, borderRight: "1px solid #e0e0e0", background: "white", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
            <div style={{ padding: "8px 16px", borderBottom: "1px solid #e0e0e0", display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 13, color: "#1a73e8", fontWeight: 600, paddingBottom: 5, borderBottom: "3px solid #1a73e8" }}>Primary</span>
              <span style={{ fontSize: 13, color: "#80868b", paddingBottom: 5 }}>Promotions</span>
              <span style={{ fontSize: 13, color: "#80868b", paddingBottom: 5 }}>Social</span>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {quiz.map(function(email) {
                const isDismissed = dismissed.indexOf(email.id) !== -1;
                const isActive = email.id === activeId;
                const isAnswered = !!answers[email.id];
                return (
                  <div
                    key={email.id}
                    onClick={function() { if (!isAnswered) setActiveId(email.id); }}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      borderBottom: "1px solid #f1f3f4",
                      background: isActive ? "#e8f0fe" : "white",
                      borderLeft: isActive ? "3px solid #1a73e8" : "3px solid transparent",
                      cursor: isAnswered ? "default" : "pointer",
                      opacity: isDismissed ? 0 : 1,
                      maxHeight: isDismissed ? 0 : 90,
                      overflow: "hidden",
                      transition: "opacity 0.25s ease, max-height 0.3s ease, padding 0.3s ease",
                      padding: isDismissed ? "0 16px" : "10px 16px",
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: email.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 11, flexShrink: 0, marginTop: 2 }}>{email.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 1 }}>
                        <span style={{ fontSize: 13, fontWeight: isAnswered ? 400 : 600, color: isAnswered ? "#80868b" : "#202124", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 120 }}>{email.senderName}</span>
                        {email.hard && <HardBadge />}
                        <span style={{ fontSize: 11, color: "#80868b", marginLeft: "auto", flexShrink: 0 }}>{email.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: isAnswered ? "#80868b" : "#202124", fontWeight: isAnswered ? 400 : 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email.subject}</div>
                      <div style={{ fontSize: 11, color: "#80868b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email.preview}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px", background: "#f6f8fc" }}>
            {active ? (
              <ReadingPane email={active} onAnswer={onAnswer} />
            ) : (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#80868b", fontSize: 15 }}>
                Select an email to read
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReadingPane({ email, onAnswer }) {
  return (
    <div style={{ background: "white", borderRadius: 8, padding: "26px 34px", border: "1px solid #e0e0e0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, fontWeight: 400, color: "#202124", lineHeight: 1.3, flex: 1 }}>{email.subject}</h1>
        {email.hard && <HardBadge />}
      </div>
    
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBottom: 18, borderBottom: "1px solid #f1f3f4", marginBottom: 22 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: email.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{email.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 14, color: "#202124" }}>{email.senderName}</span>
              <span style={{ fontSize: 13, color: "#5f6368", marginLeft: 8 }}>{"<" + email.sender + ">"}</span>
            </div>
            <span style={{ fontSize: 13, color: "#80868b", flexShrink: 0, marginLeft: 12 }}>{email.time}</span>
          </div>
          <div style={{ fontSize: 12, color: "#80868b" }}>to me</div>
        </div>
      </div>

      <div style={{ fontSize: 14, color: "#202124", lineHeight: 1.85, whiteSpace: "pre-wrap", marginBottom: 32 }}>
        {renderBodyWithLinks(email.body)}
      </div>

      <div style={{ borderTop: "1px solid #f1f3f4", paddingTop: 22 }}>
        <div style={{ fontSize: 13, color: "#5f6368", marginBottom: 14 }}>
          Is this email safe or a phishing attempt?
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={function() { onAnswer(email.id, "safe"); }}
            style={{ padding: "9px 22px", borderRadius: 4, border: "1px solid #188038", background: "white", color: "#188038", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            Mark as Safe
          </button>
          <button
            onClick={function() { onAnswer(email.id, "phishing"); }}
            style={{ padding: "9px 22px", borderRadius: 4, border: "none", background: "#d93025", color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer" }}
          >
            Report Phishing
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultsScreen({ quiz, answers, onRestart, onHome }) {
  const [viewingEmailId, setViewingEmailId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const total = quiz.length;

  const score = quiz.filter(
    (e) => answers[e.id]?.correct
  ).length;

  const pct = Math.round((score / total) * 100);

  const grade =
    pct === 100
      ? { label: "Perfect!", color: "#0d652d", bg: "#e8f0fe" }
      : pct >= 50
      ? { label: "Needs Practice", color: "#b06000", bg: "#fef3cd" }
      : { label: "Keep Training", color: "#c5221f", bg: "#fce8e6" };

  const viewingEmail = viewingEmailId ? quiz.find(function(e) { return e.id === viewingEmailId; }) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fc", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: "white", borderBottom: "1px solid #e0e0e0", padding: "0 32px", height: 60, display: "flex", alignItems: "center", gap: 8 }}>
        <FishMailLogo />
        <span style={{ fontSize: 21, color: "#5f6368", fontWeight: 300, marginLeft: 4 }}>FishMail</span>
        <span style={{ marginLeft: 10, fontSize: 13, color: "#80868b" }}>/ Training Results</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button onClick={onRestart} style={{ background: "#1a73e8", color: "white", border: "none", borderRadius: 4, padding: "8px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
            Try again
          </button>
          <button onClick={onHome} style={{ background: "white", color: "#3c4043", border: "1px solid #dadce0", borderRadius: 4, padding: "8px 18px", fontSize: 13, cursor: "pointer" }}>
            Home
          </button>
        </div>
      </div>

      {viewingEmail && (
        <div
          onClick={function() { setViewingEmailId(null); }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div
            onClick={function(e) { e.stopPropagation(); }}
            style={{ background: "white", borderRadius: 8, padding: "30px 38px", maxWidth: 660, width: "100%", maxHeight: "80vh", overflowY: "auto" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <h2 style={{ fontSize: 20, fontWeight: 400, color: "#202124", lineHeight: 1.3, maxWidth: 480 }}>{viewingEmail.subject}</h2>
              <button onClick={function() { setViewingEmailId(null); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#5f6368", padding: 4, flexShrink: 0, marginLeft: 16 }}>
                x
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 14, borderBottom: "1px solid #f1f3f4", marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: viewingEmail.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 12 }}>{viewingEmail.avatar}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#202124" }}>{viewingEmail.senderName}</div>
                <div style={{ fontSize: 12, color: "#5f6368" }}>{viewingEmail.sender}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#202124", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{renderBodyWithLinks(viewingEmail.body)}</div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ background: "white", borderRadius: 8, border: "1px solid #e0e0e0", padding: "28px 36px", marginBottom: 22, display: "flex", alignItems: "center", gap: 44 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 58, fontWeight: 700, color: "#202124", lineHeight: 1, letterSpacing: -2 }}>
              {score}
              <span style={{ fontSize: 28, color: "#5f6368", fontWeight: 400 }}>/{total}</span>
            </div>
            <div style={{ marginTop: 8, background: grade.bg, color: grade.color, borderRadius: 4, padding: "3px 12px", fontSize: 13, fontWeight: 600, display: "inline-block" }}>{grade.label}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#202124", marginBottom: 6 }}>Quiz complete</div>
            <div style={{ fontSize: 14, color: "#5f6368", lineHeight: 1.7, marginBottom: 14 }}>
              {pct >= 90 ? "Excellent work. You have sharp instincts for spotting phishing attempts."
                : pct >= 70 ? "Good result. Review the emails you missed and you'll be ready for anything."
                : pct >= 50 ? "A solid start. Study the red flags below and run the quiz again."
                : "Phishing emails are designed to fool you. Review each explanation carefully before trying again."}
            </div>
            <div style={{ display: "flex", gap: 22 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#137333" }}>{score}</div>
                <div style={{ fontSize: 12, color: "#80868b" }}>correct</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#c5221f" }}>{total - score}</div>
                <div style={{ fontSize: 12, color: "#80868b" }}>missed</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#202124" }}>{pct}%</div>
                <div style={{ fontSize: 12, color: "#80868b" }}>accuracy</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, color: "#5f6368", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Review all emails</div>

        {quiz.map(function(email) {
          const ans = answers[email.id];
          const correct = ans ? ans.correct : false;
          const isOpen = expandedId === email.id;
          return (
            <div key={email.id} style={{ background: "white", border: "1px solid #e0e0e0", borderRadius: 8, marginBottom: 7, overflow: "hidden" }}>
              <div
                onClick={function() { setExpandedId(isOpen ? null : email.id); }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 18px", cursor: "pointer", background: "white" }}
              >
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: correct ? "#137333" : "#d93025", flexShrink: 0 }} />
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: email.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>{email.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#202124" }}>{email.senderName}</span>
                    {email.hard && <HardBadge />}
                    <span style={{ fontSize: 12, color: "#80868b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email.subject}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#80868b" }}>{email.sender}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 9px", borderRadius: 4, background: email.phishing ? "#fce8e6" : "#e6f4ea", color: email.phishing ? "#c5221f" : "#137333" }}>
                    {email.phishing ? "Phishing" : "Legitimate"}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 500, padding: "2px 9px", borderRadius: 4, background: correct ? "#e6f4ea" : "#fce8e6", color: correct ? "#137333" : "#c5221f" }}>
                    {correct ? "Correct" : "Incorrect"}
                  </span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#80868b" strokeWidth="2" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>

              {isOpen && (
                <div style={{ borderTop: "1px solid #f1f3f4", padding: "14px 18px 18px" }}>
                  <p style={{ fontSize: 13, color: "#202124", lineHeight: 1.75, marginBottom: 12 }}>
                    <strong style={{ color: "#5f6368" }}>Explanation: </strong>
                    {email.explanation}
                  </p>
                  {email.hard && email.hardReason ? (
                    <div style={{ fontSize: 12, color: "#7d4e00", background: "#fef3cd", borderRadius: 4, padding: "7px 11px", marginBottom: 12 }}>
                      <strong>Why it is hard: </strong>{email.hardReason}
                    </div>
                  ) : null}
                  <button
                    onClick={function() { setViewingEmailId(email.id); }}
                    style={{ background: "none", border: "1px solid #dadce0", borderRadius: 4, padding: "6px 13px", fontSize: 13, color: "#1a73e8", cursor: "pointer" }}
                  >
                    View original email
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
