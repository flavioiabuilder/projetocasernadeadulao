---
name: web-a11y-debugging
description: Debugs accessibility issues with automated scanners, browser accessibility trees, keyboard checks, screen reader smoke tests, custom CSS/JS rules, and CI gates. Use when triaging barriers or building accessibility validation pipelines.
---

# Web A11y Debugging

## Debug Workflow

1. Reproduce the user-facing barrier.
2. Inspect role, name, state, value, and focus behavior.
3. Run automation for common issues.
4. Verify with keyboard and screen reader smoke checks.
5. Add focused regression coverage or a CI gate where practical.

## Tooling Checklist

```markdown
Debugging checklist

- [ ] Automated finding is confirmed or dismissed with rationale
- [ ] Accessibility tree exposes expected role/name/state
- [ ] Keyboard behavior matches expected contract
- [ ] Screen reader smoke path confirms real impact
- [ ] Custom local rule catches recurring anti-patterns where useful
- [ ] CI gate blocks new Critical/High regressions where practical
```

## Tooling Principles

- Automation finds many common issues but does not replace manual testing.
- Tool coverage differs across browsers, Shadow DOM, and widget complexity.
- Custom CSS/JS debug rules should be dev-only and actionable.

## Output

Provide confirmed defects, evidence, reproduction steps, fix direction, tool limitations, and residual risk.
