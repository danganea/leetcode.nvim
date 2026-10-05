local fzf = require("fzf-lua")
local t = require("leetcode.translator")
local language_picker = require("leetcode.picker.language")
local Picker = require("leetcode.picker")

local deli = "\t"

return function(question, cb)
    local items = language_picker.items(question.q.code_snippets)

    local entries = {}
    for i, item in ipairs(items) do
        entries[i] = table.concat({ Picker.normalize({ item })[1], tostring(i) }, deli)
    end

    fzf.fzf_exec(entries, {
        prompt = t("Available Languages") .. "> ",
        winopts = {
            height = language_picker.height,
            width = language_picker.width,
        },
        fzf_opts = {
            ["--delimiter"] = deli,
            ["--nth"] = "1",
            ["--with-nth"] = "1",
        },
        actions = {
            ["default"] = function(selected)
                local item = items[tonumber(Picker.hidden_field(selected[1], deli))]
                if item then
                    local snippet = item.value.t
                    language_picker.select(
                        { slug = snippet.slug, lang = snippet.lang },
                        question,
                        cb
                    )
                end
            end,
        },
    })
end
