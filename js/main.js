$(function () {
  var RM = matchMedia("(prefers-reduced-motion: reduce)").matches, D = RM ? 0 : 200;

  /* ===== DATA ===== */
  var SP = [
    { n: 15, c: 94, d: 62, ti: 30, di: 21 }, { n: 16, c: 117, d: 117, ti: 29, di: 28 },
    { n: 17, c: 33, d: 12, a: 62, ti: 11, di: 4 }, { n: 18, c: 41, d: 41, ti: 13, di: 13 }
  ];
  var STAGES = [
    { v: "Build", p: "2016–2019", t: "Senior Software Developer", y: 190,
      r: "Primary developer of the Giftwork Action Portal, growing into requirements, stakeholder and release coordination.",
      x: "CakePHP, Laravel, MySQL, REST integrations, AWS-hosted applications, multilingual workforce analytics.",
      k: "Built action planning, implementation tracking and impact analysis, plus the India List Portal and survey reporting.",
      e: "Delivered product features and integrations. Qualitative: no metrics claimed for this period.",
      g: "Technical credibility and systems thinking, plus first exposure to release and stakeholder coordination.", c: [] },
    { v: "Coordinate", p: "2020–2022", t: "Technical Project Coordinator", y: 70,
      r: "Requirements, documentation, approvals, stakeholder and release coordination, escalation and status reporting.",
      x: "India List Portal registration and survey-driven certification for 800+ companies across 4–5 countries.",
      k: "Controlling documentation and approvals so changes were agreed before build.",
      e: "Predictability 72% → 88% (this period only). Rework down about 20% through controlled documentation and approvals.",
      g: "Requirements discipline and the habit of getting decisions in writing.", c: [] },
    { v: "Manage", p: "2022–2025", t: "Project Manager, GPIT", y: 200,
      r: "Owned a product platform from requirements to post-production support. Managed 2 Lead Developers and 1 QA as direct reports.",
      x: "Client: Great Place to Work. Agile planning, refinement, retrospectives, releases, RICE-based intake.",
      k: "Choosing explicit trade-offs for new requests instead of absorbing them. Enabling 3 developers to adopt AI-assisted coding.",
      e: "Predictability 78% → 93% within 12 months. Unplanned work from several times a week to about once per sprint. Capacity about 20 → 80 SP, reflecting broader practice maturity, not AI alone. [Add baseline and calculation.]",
      g: "Scope, capacity and prioritization control, and people management.", c: [3] },
    { v: "Stabilize", p: "Dec 2025–Mar 2026", t: "Assistant Technical Project Manager", y: 70,
      r: "Xchange sprint planning, execution, dependencies, UAT, release coordination and stakeholder communication.",
      x: "Enterprise client (USA), B2B digital commerce platform.",
      k: "Keeping Engineering, QA, Product and Technical Leads aligned while dependencies were resolved.",
      e: "Qualitative: expanded into the Technical Project Manager role. Sprint analysis from this engagement is in case 02.",
      g: "Sprint governance and release readiness at enterprise scale.", c: [1, 2] },
    { v: "Govern", p: "Apr 2026–now", t: "Technical Project Manager", y: 200,
      r: "Two concurrent streams: Xchange (5 Technical Leads and their teams) and PriceFX (7 developers, 4 QA, 1 BA, 1 PO). Coordination scale, not direct reports.",
      x: "PriceFX, Multi-LTP, OPE, Bitbucket, GCP Cloud Build, Jira, CCB/CAB.",
      k: "Directed the ~34-ticket Multi-LTP release. Raised OPE test volume 34 → 118 → 124 records to probe synchronization and table-locking risk. Helped isolate a Cloud Build / Bitbucket deployment issue.",
      e: "Meeting records and documented frameworks. Final release outcome: [add before publishing].",
      g: "Release governance, production risk and vendor transition management.", c: [0, 4] },
    { v: "Lead", p: "Future", t: "Delivery Manager / Program Leadership", y: 90, fu: 1,
      r: "An aspiration, not a current role.",
      x: "Multi-team portfolios, delivery metrics across programs, coaching delivery leads.",
      k: "Moving from governing two streams to setting the operating model for many.",
      e: "None claimed. This is a direction.",
      g: "Next: portfolio-level capacity planning, executive reporting and program risk ownership.", c: [] }
  ];
  var CASES = [
    { s: "pricing-tradeoffs", t: "Pricing priorities and conditional releases", w: "Sales Pricing · Sept–Oct 2026", ev: "Evidence: weekly prioritization minutes",
      p: "Multi-LTP, Multi-Edit, MPI, production support, hypercare and a vendor knowledge transfer all competed for the same development and QA capacity.",
      sit: "The pricing workstream carried several large efforts while knowledge moved between vendor teams. Each had a business case. All drew on one pool of capacity.",
      gap: "Dates were discussed as promises. No one had recorded what had to be true for a date to hold, or what would be traded away to protect it.",
      did: ["I ran the recurring prioritization and delivery review and kept the decision record.", "I took the action to factor MPI's QA demand into planning before the next sprint was finalized.", "I made release options and their conditions explicit, so Product and the business could decide with the constraints visible."],
      shows: "Conditional release options, QA capacity treated as a constraint, hypercare prioritized, and knowledge transfer recorded as reduced capacity.",
      not: "The final release result. The minutes show how decisions were framed, not how they turned out. [Add the Multi-LTP outcome.] Priority decisions belonged to Product and the business.",
      diff: "[Confirm] Record the trade-off for each deferred item at the moment of decision.", vis: "tl" },
    { s: "sprint-scope", t: "Sprint scope versus commitment", w: "Xchange · Four-sprint analysis", ev: "Evidence: sprint summaries",
      p: "One completion percentage hides original commitment, post-freeze additions, points and item counts.",
      sit: "Xchange sprints reported a single completion figure while work was added after the freeze and some items carried zero points.",
      gap: "A team can deliver its whole commitment and still look overloaded, or miss it because of unplanned work. One number cannot tell the two apart.",
      did: ["I analyzed each sprint with original commitment, added scope, point completion and item completion reported separately.", "Across four sprints: 232 of 285 committed points (81.4%) and 66 of 83 items (79.5%)."],
      shows: "Sprint 17 had 62 points added after the freeze against a 33-point commitment: strong scope pressure. Sprint 16 delivered all points but 28 of 29 items, since one item carried zero points.",
      not: "That the additions caused the Sprint 17 shortfall. The totals are my calculation from summaries, not an audited KPI. The 65 SP / 22 items / 77% figure on my resume is a separate reporting snapshot. [State its sprint or date.]",
      diff: "[Confirm] Agree written definitions of committed and added with the product owner first.", vis: "bars" },
    { s: "support-vs-delivery", t: "Tracking work versus committing to work", w: "CX/Xchange · MHD Support Model", ev: "Status: designed and documented",
      p: "Support requests and delivery commitments become indistinguishable when they share one workflow.",
      sit: "Support tickets arrived beside planned work. Some needed no code. Others were enhancements in disguise.",
      gap: "Tracked work looked like approved work, support effort went unreported, and developers could start before the business had decided.",
      did: ["I designed and documented the MHD Support Model.", "The original ticket stays the system of record. No-code support links to a tracking story with no velocity impact. Non-trivial enhancements pause for a Product priority decision and a capacity check."],
      shows: "A written split of responsibility: Engineering decides feasibility, Product decides priority, and the sprint holds only approved work.",
      not: "Adoption, reduced scope creep, a smaller backlog or less velocity distortion. [Add evidence if you have it.]",
      diff: "[Confirm] Review routing after the first few sprints to see whether tickets follow the model.", vis: "tree" },
    { s: "value-realization", t: "Capacity and business value", w: "Delivery governance · Value Realization", ev: "Status: designed, not measured",
      p: "Ticket counts show activity, not why capacity is consumed or what deferral would risk.",
      sit: "Reports showed what work existed but not how capacity split between keeping systems stable and building something new.",
      gap: "Without that view, prioritization drifts toward the loudest request and the cost of saying later stays invisible.",
      did: ["I documented the Value Realization & Impact Assessment around two questions: why spend capacity on this, and what happens if we do not?", "Business analysts classify and validate. I own consistency, gap flagging and monthly capacity-by-category reporting."],
      shows: "Defined categories, an ownership split and data-quality rules. Classification follows purpose, not Jira issue type.",
      not: "Any saving or better prioritization. No category percentages have been reported, and none are shown here.",
      diff: "[Confirm] Pilot the classification on one sprint to surface definition disagreements first.", vis: "mx" },
    { s: "release-and-transition", t: "Release governance and technical transition", w: "PriceFX · Release, validation, vendor handover", ev: "Status: playbook documented, branching proposed",
      p: "A major release and a vendor handover created overlapping demands for readiness, validation and knowledge transfer.",
      sit: "A ~34-ticket Multi-LTP release ran alongside a vendor transition, with limited notice and few effective KT days. [Confirm the figures before stating them.]",
      gap: "A change can be built yet lack QA, UAT or approval, and knowledge shared in meetings can leave nothing the receiving team can use.",
      did: ["I directed the Multi-LTP release through UAT, approvals, sequencing, validation and Go/No-Go readiness.", "I produced the Pricing Release Governance Playbook, an Offline Pricing KT guide and a handover follow-up structure, and proposed a branching process.", "On a production deployment failure, I helped isolate the Cloud Build / Bitbucket issue and drove escalation and contingency planning. The investigation was shared work."],
      shows: "The artifacts exist, and transition work was recorded as a capacity constraint.",
      not: "Fewer release failures, a shorter transition or complete knowledge transfer. The branching process is a proposal, not implemented. Approval-email evidence for the production validation remained open.",
      diff: "[Confirm] Have the receiving team walk the KT guide through a real scenario before sign-off.", vis: "flow" }
  ];
  var PR = [
    ["Clarify before committing", "Establish the outcome, constraints and decision owner."],
    ["Capacity before commitment", "Make the cost of new work visible."],
    ["Separate tracking from delivery", "Visibility alone is not approval or commitment."],
    ["Make risk actionable", "Give every risk an owner, a next action and a decision date."],
    ["Evidence before release", "Confirm readiness through testing, approvals and operational controls."],
    ["Improve through learning", "Review outcomes and change the operating model when evidence supports it."]
  ];

  /* ===== NAV, DRAWERS ===== */
  $(".mb").on("click", function () { $(this).attr("aria-expanded", $("#nav").toggleClass("open").hasClass("open")); });
  $("#nav a").on("click", function () { $("#nav").removeClass("open"); });
  $(".stat").on("click", function () {
    var was = $(this).attr("aria-expanded") === "true";
    $(".stat").attr("aria-expanded", false); $(".dr").slideUp(D);
    if (!was) { $(this).attr("aria-expanded", true); $("#" + $(this).data("id")).slideDown(D); }
  });

  /* ===== SPRINT CHART (hero + case 02) ===== */
  function chart($c, $r, mode) {
    var sp = mode === "sp", max = sp ? 120 : 30; $c.empty();
    $.each(SP, function (i, s) {
      var v = sp ? [["c", s.c], ["d", s.d]].concat(s.a ? [["a", s.a]] : []) : [["c", s.ti], ["d", s.di]];
      var $b = $('<div class="b"></div>');
      $.each(v, function (j, x) { $b.append('<i class="' + x[0] + '" data-v="' + x[1] + '"></i>'); });
      $('<button class="g" aria-pressed="false"></button>').append($b).append("<span>Sprint " + s.n + "</span>").data("s", s).appendTo($c);
    });
    setTimeout(function () { $c.find("i").each(function () { $(this).css("height", $(this).data("v") / max * 100 + "%"); }); }, 30);
    $c.off("click").on("click", ".g", function () {
      var s = $(this).data("s"); $c.find(".g").attr("aria-pressed", false); $(this).attr("aria-pressed", true);
      $r.text(sp ? "Sprint " + s.n + ": " + s.d + " of " + s.c + " committed points delivered (" + Math.round(s.d / s.c * 100) + "%)." + (s.a ? " " + s.a + " points added after the freeze." : " Added scope not shown for this sprint.")
        : "Sprint " + s.n + ": " + s.di + " of " + s.ti + " items delivered.");
    });
  }
  chart($("#h-chart"), $("#h-read"), "sp");
  $("#h-tog button").on("click", function () {
    $("#h-tog button").removeClass("on"); $(this).addClass("on"); $("#h-read").text("Select a sprint.");
    chart($("#h-chart"), $("#h-read"), $(this).data("m"));
  });

  /* ===== CASE MOSAIC ===== */
  $.each(CASES, function (i, c) {
    $("#mosaic").append('<a class="m m' + (i + 1) + '" href="#/' + c.s + '"><div><span class="mono">Case ' + (i + 1) + ' · ' + c.w + '</span><h3>' + c.t + '</h3><p>' + c.p + '</p></div><span class="ev">' + c.ev + '</span></a>');
  });

  /* ===== DELIVERY LAB ===== */
  function sim() {
    var c = +$("#s-c").val(); $("#s-d").attr("max", c);
    var d = Math.min(+$("#s-d").val(), c), a = +$("#s-a").val();
    $("#s-d").val(d); $("#o-c").text(c); $("#o-d").text(d); $("#o-a").text(a);
    $("#r-pct").text(Math.round(d / c * 100) + "%"); $("#r-tot").text(c + a + " SP");
    $("#r-msg").text(a === 0 ? "No added scope: the original commitment is the whole picture."
      : a > c ? "Added scope is " + (a / c).toFixed(1) + "× the original commitment. Ask who approved it and what was traded off."
      : "Added scope is " + Math.round(a / c * 100) + "% of the commitment. Report it beside completion, not inside it.");
  }
  function simReset() { $("#s-c").val(50); $("#s-d").val(32); $("#s-a").val(12); sim(); }
  $("#s-c,#s-d,#s-a").on("input", sim); $("#s-reset").on("click", simReset); simReset();
  function gates() {
    var n = $("#gates input:checked").length;
    $("#g-n").text(n + " of 5");
    $("#g-msg").text(n === 5 ? "All five gates are evidenced. This is not a release approval: the formal Go/No-Go decision and any mandatory controls still apply."
      : "Not ready. " + (5 - n) + (n === 4 ? " gate remains" : " gates remain") + " open.");
  }
  $("#gates input").on("change", gates);
  $("#g-reset").on("click", function () { $("#gates input").prop("checked", false); gates(); }); gates();

  /* ===== CAREER ROADMAP ===== */
  var X = [80, 230, 380, 540, 690, 850], d = "M0 " + STAGES[0].y;
  var pts = $.map(STAGES, function (s, i) { return [[X[i], s.y]]; }), prev = [0, STAGES[0].y];
  $.each(pts, function (i, p) { var h = (p[0] - prev[0]) / 2; d += " C" + (prev[0] + h) + " " + prev[1] + " " + (p[0] - h) + " " + p[1] + " " + p[0] + " " + p[1]; prev = p; });
  d += " C" + (prev[0] + 55) + " " + prev[1] + " 905 " + prev[1] + " 960 " + prev[1];
  var NS = "http://www.w3.org/2000/svg", svg = $("#road svg")[0];
  $.each(["rd", "rc"], function (i, k) { var el = document.createElementNS(NS, "path"); el.setAttribute("class", k); el.setAttribute("d", d); svg.appendChild(el); });
  $.each(STAGES, function (i, s) {
    $("#road").append('<button class="n ' + (s.y < 140 ? "up" : "dn") + (s.fu ? " fu" : "") + '" aria-pressed="false" data-i="' + i + '" style="left:' + X[i] / 9.6 + '%;top:' + (30 + s.y) + 'px">' + (s.fu ? "→" : i + 1) + '<em><small>' + s.p + ' · ' + s.v + '</small>' + s.t + '</em></button>');
  });
  function stage(i) {
    var s = STAGES[i]; $(".n").attr("aria-pressed", false).eq(i).attr("aria-pressed", true);
    var links = $.map(s.c, function (k) { return '<a class="pill" href="#/' + CASES[k].s + '">Case ' + (k + 1) + ': ' + CASES[k].t + '</a>'; }).join("") || '<span class="small">No case study for this stage.</span>';
    $("#stage").toggleClass("fut", !!s.fu).html('<p class="mono">' + s.p + ' · ' + s.v + (s.fu ? ' · aspiration, not a current role' : '') + '</p><h3>' + s.t + '</h3><div class="sg"><div><h4>Role and ownership</h4><p>' + s.r + '</p><h4>Technical context</h4><p>' + s.x + '</p></div><div><h4>Challenges and decisions</h4><p>' + s.k + '</p><h4>Outcomes and evidence</h4><p>' + s.e + '</p></div></div><h4 class="mono" style="margin-top:16px">Capabilities that enabled the next stage</h4><p>' + s.g + '</p><div style="margin-top:10px">' + links + '</div>');
  }
  $("#road").on("click", ".n", function () { stage($(this).data("i")); }); stage(4);

  /* ===== PRINCIPLES + CHAIN ===== */
  $.each(PR, function (i, p) {
    $("#pl").append('<li><button aria-pressed="false" data-i="' + i + '">' + p[0] + '</button></li>');
    $("#chain").append('<div class="cn" data-i="' + i + '"><i></i><div><b>' + p[0] + '</b><span>' + p[1] + '</span></div></div>');
  });
  function pr(i) { $("#pl button").attr("aria-pressed", false).eq(i).attr("aria-pressed", true); $(".cn").removeClass("on").eq(i).addClass("on"); }
  $("#pl").on("click", "button", function () { pr($(this).data("i")); });
  $("#chain").on("click", ".cn", function () { pr($(this).data("i")); }); pr(0);

  /* ===== CASE PAGES (one template, hash routes) ===== */
  function vis(k) {
    if (k === "tl") return '<div class="tl"><div><b>Sept 8</b>Sept 25 working target. Sept 18 option only if UAT, validation and sign-off hold.</div><div><b>Oct 6</b>MPI QA demand planned before sprint scope. Hypercare first.</div><div><b>Oct 13</b>21-item sprint with reserved support and hypercare capacity. KT counted as lost capacity. Other enhancements held.</div></div>';
    if (k === "bars") return '<div class="tog" id="c-tog"><button class="on" data-m="sp">Story points</button><button data-m="it">Items</button></div><div class="chart" id="c-chart"></div><div class="leg"><span class="k c">Committed</span><span class="k d">Delivered</span><span class="k a">Added</span></div><p class="read" id="c-read" aria-live="polite">Select a sprint.</p>';
    if (k === "tree") return '<p><b>What does the request need?</b></p><button class="chip" data-a="0">No code change</button><button class="chip" data-a="1">A code change</button><button class="chip" data-a="2">A non-trivial enhancement</button><div class="ans" id="c-ans" aria-live="polite"></div>';
    if (k === "mx") return '<div class="mx"><div><b>Operational Cost</b>Would something running today break, destabilize or create risk? Example: production defects, security patches.<p class="small">Capacity share: not yet reported</p></div><div><b>Growth + Transform</b>Would a planned capability or improvement be lost? Example: new features, integrations.<p class="small">Capacity share: not yet reported</p></div><div><b>Pure Consumption</b>Would nothing break and no capability be lost? Example: investigation leading to no decision.<p class="small">Capacity share: not yet reported</p></div></div>';
    return '<div class="flow"><span>Development complete</span>›<span>QA evidence</span>›<span>UAT sign-off</span>›<span>Rollback reviewed</span>›<span>Go/No-Go recorded</span></div><p style="margin-top:14px"><span class="flow"><span class="pr">Proposed: branching and release management process</span></span></p><p class="small">Dashed amber means proposed, not implemented.</p>';
  }
  var TREE = ["<b>Tracking story.</b> The original ticket stays the record. Workload is visible with no delivery commitment and no velocity impact.", "<b>Normal delivery lifecycle.</b> Development, testing, UAT and release, with a delivery story under the usual rules.", "<b>Pause and escalate.</b> Product makes a priority decision, it is recorded, and a delivery story is created only after approval and a capacity check."];
  function openCase(i) {
    var c = CASES[i], nx = CASES[(i + 1) % 5];
    $("#case-in").html('<a class="back" href="#cases">‹ All case studies</a><p class="mono">Case ' + (i + 1) + ' of 5 · ' + c.w + '</p><h1 id="ch" tabindex="-1">' + c.t + '</h1><h2>The situation</h2><p>' + c.sit + '</p><h2>The problem</h2><p>' + c.gap + '</p><h2>What I personally did</h2>' + $.map(c.did, function (x) { return "<p>" + x + "</p>"; }).join("") + '<h2>Decision visual</h2><div class="vis">' + vis(c.vis) + '</div><details open><summary>What the evidence shows</summary><div>' + c.shows + '</div></details><details open><summary>What it does not prove</summary><div>' + c.not + '</div></details><details><summary>What I would do differently</summary><div>' + c.diff + '</div></details><div class="nxt"><span class="small">' + c.ev + '</span><a class="btn" href="#/' + nx.s + '">Next: ' + nx.t + '</a></div>');
    $("#case").prop("hidden", false).scrollTop(0); $("body").addClass("lock"); $("#ch").focus();
    if (c.vis === "bars") {
      chart($("#c-chart"), $("#c-read"), "sp");
      $("#c-tog button").on("click", function () { $("#c-tog button").removeClass("on"); $(this).addClass("on"); $("#c-read").text("Select a sprint."); chart($("#c-chart"), $("#c-read"), $(this).data("m")); });
    }
    $("#case .chip").on("click", function () { $("#case .chip").removeClass("on"); $(this).addClass("on"); $("#c-ans").html(TREE[$(this).data("a")]); });
  }
  function route() {
    var m = location.hash.match(/^#\/(.+)$/), i = -1;
    $.each(CASES, function (k, c) { if (m && c.s === m[1]) i = k; });
    if (i > -1) { openCase(i); } else { $("#case").prop("hidden", true); $("body").removeClass("lock"); }
  }
  $(window).on("hashchange", route).on("keydown", function (e) { if (e.key === "Escape" && !$("#case").prop("hidden")) { location.hash = "#cases"; } });
  route();
});
