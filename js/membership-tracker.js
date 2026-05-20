(function() {
  window.registerMembershipRecord = function(form) {
    var cfg = window.NQDVGC_MEMBERSHIP || {};
    if (!cfg.sheetWebhookUrl || !cfg.webhookSecret) return Promise.resolve();

    var payload = {
      secret: cfg.webhookSecret,
      action: 'register',
      joinDate: new Date().toISOString().slice(0, 10)
    };
    var fd = new FormData(form);
    fd.forEach(function(value, key) {
      if (key.charAt(0) === '_') return;
      payload[key] = value;
    });

    var controller = new AbortController();
    var timer = setTimeout(function() { controller.abort(); }, 8000);
    return fetch(cfg.sheetWebhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
      signal: controller.signal
    }).catch(function() { /* optional; never block the form */ })
      .finally(function() { clearTimeout(timer); });
  };
})();
