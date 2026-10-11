# Apps and tools

Maintainer: Quincy Childs

This repository records the tools shown in the supplied screenshots. Listing an app here does not install it or make it a project dependency.

| Item | Purpose | Installation and repository treatment |
| --- | --- | --- |
| iSH | Alpine Linux terminal on iPhone | Already in use. Install compatible command-line packages with apk. |
| Git, curl, ca-certificates | Repository access and HTTPS | Run `sh scripts/setup-ish-tools.sh` in iSH. User confirmed these packages are installed. |
| Grok Bot | External AI assistant | Follow https://x.ai/bot for supported downloads. No iSH installer is provided here. |
| Vivaldi | Browser for browsing and testing | Install the iOS app from the App Store via https://vivaldi.com/ios/. External tool, not an Alpine package. |
| AltStore | iOS app distribution / sideloading | Screenshot shows marketplace installation is ineligible on this device. See https://altstore.io/ and the Classic Windows instructions at https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows. iSH does not remove the eligibility requirement. |
| relikd | GitHub developer profile | https://github.com/relikd is a profile, not an installable extension. |
| baRSS | macOS menu bar RSS reader | https://github.com/relikd/baRSS requires macOS. Source can be read in iSH, but the app cannot run there. Keep it as a reference rather than an iSH dependency. |
| iSH Discord | Support community | Screenshot confirms membership. Open Discord and select Go to Server. No terminal installation is needed. Community information: https://ish.app/. |

## Work from a dedicated directory

The user's current local checkout is rooted at `/root`, so Git reports histories, caches, installed dependencies, and unrelated coursework. Use a separate checkout for this repository:

```sh
mkdir -p /mnt/ish-repos
cd /mnt/ish-repos
git clone https://github.com/Queond/ish-test.git ish-test-tools
cd ish-test-tools
sh scripts/setup-ish-tools.sh
git status --short
```

The clone command expects `ish-test-tools` not to exist. If the repository is private, authenticate using an approved GitHub method; do not put tokens in the repository or a remote URL. If `/mnt` is not writable, use another writable directory outside `/root`.

This leaves the original checkout and its files untouched. Do not use `git add .` or `git add -A` in the home-directory checkout. Stage only intended project paths. The new `.gitignore` prevents matching untracked files from being added; it does not remove files already tracked or clean Git history.
