-- format
-- VER[tab]function( params [, optional] )

--[[ output
    "{{name}}": {
        "body": "{{name}}(${0:...})",
        "description": "{{VER}}\n\{{LINE = name( message [, level] )}}",
        "prefix": "{{name}}",
        "scope": "source.lua"
    }

]]
JSON = require ("json")



-- see if the file exists
function file_exists(file)
    local f = io.open(file, "rb")
    if f then f:close() end
    return f ~= nil
end

-- get all lines from a file, returns an empty 
-- list/table if the file does not exist
function lines_from(file)
    if not file_exists(file) then return {} end
    lines = {}
    for line in io.lines(file) do 
        lines[#lines + 1] = line
    end
    return lines
end


local filename = "c4functions.txt"
local lines = lines_from(filename)
outData = {}
for k,v in pairs(lines) do
    local name, bodyParams, description,version
    local find = string.find
    local body = ""
    
    if (find(v, "(  )") ) then
        --single line function, no params
        _,_, version, name = find(v, "(.-)\t(.-)(  )")
        name = name:sub(1,-2) -- :/
        body = name.."()"
    else
        _,_, version, name, bodyParams = string.find(v, "(.-)\t(.-)%(%s(.+)%s%)") 
        local outStr = "( "

        if (bodyParams) then
            local requires, optionals
            if (bodyParams:find("%[") ) then -- there are optionals
                local reqStop = bodyParams:find("%[")
                local optStart, optFinish = bodyParams:find("%[.*%]")
                optionals = bodyParams:sub(optStart,optFinish)
                requires = bodyParams:sub(1,(#optionals+1)*-1)
            else -- no optionals but there are params
                requires = bodyParams
            end
            local paramCount = 1
            for word in string.gmatch(requires, '([^,%s%[%]]+)') do
                outStr = outStr .. "${".. paramCount ..":".. word .."}, "
                paramCount = paramCount + 1
            end
            if (optionals) then
                for word in string.gmatch(optionals, '([^,%s%[%]]+)') do
                    outStr = outStr .. "${".. paramCount ..":[,".. word .."]}, "
                    paramCount = paramCount + 1
                end
            end
            outStr = outStr:sub(1,-3)
        end

        outStr = outStr .. " )"
        body = name..outStr
        -- print(body)
    end
    print(body)
    outData[name] = {}
    outData[name].body = body
    outData[name].description = version .. "\n\n" .. body
    outData[name].prefix = name
    -- outData[name].scope = "source.lua"
end

outfile = io.open("snippets.json" , "w+")
outfile:write(JSON:encode_pretty(outData))
outfile:close()
outfile =nil


