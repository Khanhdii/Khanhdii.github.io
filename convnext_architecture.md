# Kiến Trúc ConvNeXtV2 - Cấu Hình Mặc Định

## Biểu Đồ Tổng Quan

```mermaid
graph TB
    Start([Input<br/>66x66x3]) --> Stem[Stem Conv2D<br/>kernel=4, stride=4<br/>filters=25<br/>→ 17x17x25]
    Stem --> StemLN[LayerNormalization]
    
    StemLN --> Stage1[Stage 1<br/>dim=25, depth=1<br/>17x17x25]
    Stage1 --> DS1[Downsample<br/>LayerNorm + Conv2D<br/>kernel=2, stride=2<br/>→ 9x9x50]
    
    DS1 --> Stage2[Stage 2<br/>dim=50, depth=1<br/>9x9x50]
    Stage2 --> DS2[Downsample<br/>LayerNorm + Conv2D<br/>kernel=2, stride=2<br/>→ 5x5x100]
    
    DS2 --> Stage3[Stage 3<br/>dim=100, depth=1<br/>5x5x100]
    
    Stage3 --> GAP[GlobalAveragePooling2D<br/>→ 100]
    GAP --> HeadLN[LayerNormalization]
    HeadLN --> Dense1[Dense 128 + GELU]
    Dense1 --> Drop[Dropout 0.25]
    Drop --> Output([Dense 64<br/>Softmax])
    
    style Start fill:#e1f5ff
    style Output fill:#ffe1e1
    style Stage1 fill:#fff4e1
    style Stage2 fill:#fff4e1
    style Stage3 fill:#fff4e1
```

## Chi Tiết ConvNeXtV2 Block

```mermaid
graph TB
    Input([Input x]) --> DWConv[DepthwiseConv2D<br/>kernel=7x7<br/>padding=same]
    DWConv --> LN1[LayerNormalization<br/>epsilon=1e-6]
    LN1 --> Expand[Conv2D 1x1<br/>filters=4×dim<br/>Expansion]
    Expand --> GELU[GELU Activation]
    GELU --> Compress[Conv2D 1x1<br/>filters=dim<br/>Compression]
    Compress --> GRN[GRN Layer<br/>Global Response<br/>Normalization]
    GRN --> DropPath{DropPath > 0?}
    DropPath -->|Yes| Drop[Dropout]
    DropPath -->|No| Add
    Drop --> Add[Add Residual]
    Input -.Residual.-> Add
    Add --> Out([Output])
    
    style Input fill:#e1f5ff
    style Out fill:#e1f5ff
    style GRN fill:#f0e1ff
```

## Chi Tiết GRN (Global Response Normalization)

```mermaid
graph TB
    X([Input x]) --> Square[x²<br/>Element-wise Square]
    Square --> Sum[Sum axis=(1,2)<br/>Spatial Reduction]
    Sum --> Sqrt[√ + eps<br/>Compute Norm]
    Sqrt --> Mean[Mean axis=-1<br/>Channel Mean]
    Mean --> Div[nx / mean<br/>Normalized]
    
    X --> Mul[x * x_normed]
    Div --> Mul
    
    Mul --> Scale[γ * result]
    Scale --> AddBias[+ β]
    X --> AddRes[x + ...]
    AddBias --> AddRes
    AddRes --> Output([Output])
    
    style X fill:#e1f5ff
    style Output fill:#e1f5ff
```

## Bảng Thông Số Mặc Định

| Tham số | Giá trị | Mô tả |
|---------|---------|-------|
| `input_shape` | (66, 66, 3) | Kích thước đầu vào |
| `num_classes` | 64 | Số lớp phân loại |
| `dims` | [25, 50, 100] | Số filters mỗi stage |
| `depths` | [1, 1, 1] | Số blocks mỗi stage |
| `dropout` | 0.25 | Tỷ lệ dropout |
| `dense_dim` | 128 | Kích thước FC layer |

## Sơ Đồ Luồng Dữ Liệu

```mermaid
flowchart LR
    A[66×66×3] -->|Stem| B[17×17×25]
    B -->|Stage1<br/>1 block| C[17×17×25]
    C -->|Down| D[9×9×50]
    D -->|Stage2<br/>1 block| E[9×9×50]
    E -->|Down| F[5×5×100]
    F -->|Stage3<br/>1 block| G[5×5×100]
    G -->|GAP| H[100]
    H -->|FC+Drop| I[64]
    
    style A fill:#e1f5ff
    style I fill:#ffe1e1
```

## Kiến Trúc Đầy Đủ - Chi Tiết Từng Layer

```mermaid
graph TD
    Input["Input Layer<br/>Shape: 66×66×3"]
    
    subgraph Stem["🌱 STEM"]
        S1["Conv2D(25, 4×4, stride=4)<br/>→ 17×17×25"]
        S2["LayerNormalization"]
        S1 --> S2
    end
    
    subgraph Stage1["📦 STAGE 1 (dim=25)"]
        subgraph Block1_1["ConvNeXtV2 Block #1"]
            B1_1["DWConv2D(7×7)<br/>17×17×25"]
            B1_2["LayerNorm"]
            B1_3["Conv2D(100) [4×dim]<br/>1×1 Expand"]
            B1_4["GELU"]
            B1_5["Conv2D(25) [dim]<br/>1×1 Compress"]
            B1_6["GRN"]
            B1_7["+ Residual"]
            B1_1 --> B1_2 --> B1_3 --> B1_4 --> B1_5 --> B1_6 --> B1_7
        end
        D1["Downsample<br/>LayerNorm + Conv2D(50, 2×2, stride=2)<br/>→ 9×9×50"]
        Block1_1 --> D1
    end
    
    subgraph Stage2["📦 STAGE 2 (dim=50)"]
        subgraph Block2_1["ConvNeXtV2 Block #1"]
            B2_1["DWConv2D(7×7)<br/>9×9×50"]
            B2_2["LayerNorm"]
            B2_3["Conv2D(200) [4×dim]<br/>1×1 Expand"]
            B2_4["GELU"]
            B2_5["Conv2D(50) [dim]<br/>1×1 Compress"]
            B2_6["GRN"]
            B2_7["+ Residual"]
            B2_1 --> B2_2 --> B2_3 --> B2_4 --> B2_5 --> B2_6 --> B2_7
        end
        D2["Downsample<br/>LayerNorm + Conv2D(100, 2×2, stride=2)<br/>→ 5×5×100"]
        Block2_1 --> D2
    end
    
    subgraph Stage3["📦 STAGE 3 (dim=100)"]
        subgraph Block3_1["ConvNeXtV2 Block #1"]
            B3_1["DWConv2D(7×7)<br/>5×5×100"]
            B3_2["LayerNorm"]
            B3_3["Conv2D(400) [4×dim]<br/>1×1 Expand"]
            B3_4["GELU"]
            B3_5["Conv2D(100) [dim]<br/>1×1 Compress"]
            B3_6["GRN"]
            B3_7["+ Residual"]
            B3_1 --> B3_2 --> B3_3 --> B3_4 --> B3_5 --> B3_6 --> B3_7
        end
    end
    
    subgraph Head["🎯 CLASSIFICATION HEAD"]
        H1["GlobalAveragePooling2D<br/>→ 100"]
        H2["LayerNormalization"]
        H3["Dense(128, GELU)"]
        H4["Dropout(0.25)"]
        H5["Dense(64, Softmax)"]
        H1 --> H2 --> H3 --> H4 --> H5
    end
    
    Input --> Stem
    Stem --> Stage1
    Stage1 --> Stage2
    Stage2 --> Stage3
    Stage3 --> Head
    Head --> Output["Output<br/>64 classes"]
    
    style Input fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    style Output fill:#ffe1e1,stroke:#cc0000,stroke-width:3px
    style Stem fill:#fff4e1
    style Stage1 fill:#f0f8ff
    style Stage2 fill:#f0f8ff
    style Stage3 fill:#f0f8ff
    style Head fill:#f0ffe1
```

