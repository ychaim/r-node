/*
  Copyright 2010 Jamie Love. All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, are
  permitted provided that the following conditions are met:

     1. Redistributions of source code must retain the above copyright notice, this list of
        conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright notice, this list
        of conditions and the following disclaimer in the documentation and/or other materials
        provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY JAMIE LOVE ``AS IS'' AND ANY EXPRESS OR IMPLIED
  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
  FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JAMIE LOVE OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
  ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  The views and conclusions contained in the software and documentation are those of the
  authors and should not be interpreted as representing official policies, either expressed
  or implied, of Jamie Love.
*/

rnode.display.Table = RNodeCore.extend (rnode.display.Display, {
    toString: function (robject) {
        var r = "<table><tr>";
        var data = robject.data();
        var keys = pv.keys (data);
        keys.forEach (function (d) {
            r += "<th>" + d + "</th>";
        });
        r += "</tr><tr>";
        keys.forEach (function (d) {
            r += "<td>" + data[d] + "</td>";
        });
        r += "</tr></table>";
        return {
            html: true,
            content: r
        };
    }
});

rnode.display.Display.register ('table', rnode.display.Table);
